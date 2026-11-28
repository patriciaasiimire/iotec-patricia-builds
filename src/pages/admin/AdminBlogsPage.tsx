import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Authenticated, AuthLoading, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { PasskeySignInForm } from '@/components/PasskeySignInForm';
import { useState } from 'react';
import type { Id } from '../../../convex/_generated/dataModel';

export function AdminBlogsPage() {

  // useState declarations:

  // isFormOpen remembers whether the form is visible.
  // title remembers what’s typed in its input.
  // useState(false) starts closed; useState("") starts with an empty title.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentText, setContentText] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [isFree, setIsFree] = useState(true);
  // The text between <...> is a TypeScript union type:
  // status may only be "draft" or "published". It starts as "draft".
  // The free/paid setting is a boolean, so it starts as true.

  const [readTimeText, setReadTimeText] = useState("1");
  const [priceText, setPriceText] = useState("0");
  const [currency, setCurrency] = useState("UGX");
  // We’re storing the number inputs as text for now.
  // Even an HTML input with type="number" gives React a text value when you read event.target.value.
  // When we submit the form, we’ll convert those strings into numbers and check they’re valid.

  const [imageFile, setImageFile] = useState<File | null>(null);
  // File | null means “either a selected browser file, or nothing selected.”
  // This is different from the Convex Storage ID—we’ll get that only after uploading.

  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  // imageFile is the file selected on your computer.
  // imageStorageId will be the ID Convex gives us after it receives that file.

  const [isSaving, setIsSaving] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createdBlogId, setCreatedBlogId] = useState<Id<"blogs"> | null>(null);
  // These remember whether a save is happening, any error, and the ID returned after a successful save.

  // useMutation declarations:

  // get the upload function from Convex
  const generateUploadUrl = useMutation(api.blogs.generateBlogImageUploadUrl);
  // useMutation gives your page a function it can call.
  // Calling this one asks Convex for a temporary upload URL;
  // the server mutation checks that you’re an admin.

  const saveBlog = useMutation(api.blogs.createBlog);
  // useMutation gives the component a function for asking Convex to create the blog.
  // Convex’s generated types will tell TypeScript which fields that function needs.


  const currentUser = useQuery(api.users.currentUser, {});
  // This asks Convex for the current visitor’s own admin status.
  // It doesn’t let the browser choose whose status to check.

  // upload handler
  const handleUploadImage = async () => {
    setUploadError(null);

    if (!imageFile){
      setUploadError("Choose an image first.")
    return;
    }
      
    if (!imageFile.type.startsWith("image/")) {
      setUploadError("Choose an image file.");
    return;
    }
      
    setIsUploading(true);

    try {
      const uploadUrl = await generateUploadUrl({});
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {"Content-type": imageFile.type},
        body: imageFile,
      });

      if (!response.ok) {
        throw new Error("Convex could not upload the image.");
      }

      const result: unknown = await response.json();

      if (
        typeof result !== "object" ||
        result === null ||
        !("storageId" in result) ||
        typeof result.storageId !== "string"
      ) {
        throw new Error("The upload response didn't contain a storage ID.")
      }

      setImageStorageId(result.storageId as Id<"_storage">);
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploadError(
        error instanceof Error ? error.message : "Image upload failed.",
      );
    } finally {
      setIsUploading(false);
    }
    // The sequence is:
    // ask Convex for a temporary URL → send the file to that URL → receive a storageId → remember it in React state.
    // The browser’s file picker’s accept="image/*" is only a hint,
    // so the handler also checks the selected file’s type.
  };

  // save action: It checks the form values, turns them into the types your Convex mutation expects, and asks Convex to create the blog.
  const handleCreateBlog = async () => {
    setCreateError(null);
    setCreatedBlogId(null);

    if (!title.trim() || !description.trim() || !category.trim()) {
      setCreateError("Enter a title, description, and category.");
      return;
    }

    if (!imageStorageId) {
      setCreateError("Upload a cover image first.")
      return;
    }

    const readTimeMinutes = Number(readTimeText);
    if (!Number.isInteger(readTimeMinutes) || readTimeMinutes < 1) {
      setCreateError("Reading time must be a whole number above zero.")
      return;
    }

    const priceAmount = isFree ? 0 : Number(priceText);
    if (!isFree && (!Number.isFinite(priceAmount) || priceAmount <= 0)) {
      setCreateError("A paid blog needs a price above zero.")
      return;
    }

    if (!currency.trim()) {
      setCreateError("Enter a currency.");
      return;
    }

    const content = contentText
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0);

      if (content.length === 0) {
        setCreateError("Write at least one paragraph.");
        return;
      }

      setIsSaving(true);

      try {
        const newBlogId = await saveBlog({
          title: title.trim(),
          description: description.trim(),
          content,
          category: category.trim(),
          status,
          ...(status === "published" ? {publishedAt: Date.now()} : {}),
          coverImageId: imageStorageId,
          readTimeMinutes,
          priceAmount,
          currency: currency.trim(),
          isFree,
        });

        setCreatedBlogId(newBlogId);
      } catch (error) {
        console.error("Creating blog failed:", error);
        setCreateError(
          error instanceof Error ? error.message : "Could not create the blog."
        );
      } finally {
        setIsSaving(false);
      }
// The checks make sure the required information is present.
// Number(...) converts the number fields from input text to numbers.
// The split(...).map(...).filter(...) turns paragraphs separated by blank lines into the string array your schema expects.
// Date.now() supplies a publication timestamp only when the status is "published".
// saveBlog(...) sends the prepared information—including the uploaded image ID—to Convex.
// try/catch shows an error if saving fails; finally always turns off the saving indicator.
// This form-side checking helps the author, but it’s not the security boundary. The Convex mutation still needs its own validation because someone could call it without using this form
  };

  return (
    <>
    <AuthLoading>
      <p>Checking sign-in...</p>
    </AuthLoading>

{/* Unauthenticated means Convex has confirmed there’s no signed-in session,
so that’s where the sign-in form belongs. When sign-in succeeds,
Convex changes the auth state and this form disappears. */}
    <Unauthenticated>
      <PasskeySignInForm />
    </Unauthenticated>

    <Authenticated>
      {currentUser === undefined ? (
        <p>Checking admin access...</p>
      ) : currentUser?.isAdmin ? (
        <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground">
          Articles &amp; Essays
        </h1>
        <Button
          onClick={() => setIsFormOpen(true)}
          type="button"
          className="self-start px-4 py-2 text-xs font-medium shadow-2xs sm:self-auto"
        >
          <Plus aria-hidden="true" className="size-3.5" />
          <span>Create New Blog</span>
        </Button>
      </div>

        {isFormOpen && (
          <div className="mt-8 rounded-xl border border-[#e8e6e0] bg-white p-6">
            
            {/* Title input */}
            <label htmlFor="blog-title" className="mb-2 block text-sm font-medium">
              Blog title
            </label>
            <input id='blog-title' value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-lg border border-[#e8e6e0] px-3 py-2" placeholder='Enter a title' />
            <p className="mt-2 text-sm text-muted-foreground">
              Title entered: {title || "Nothing yet"}
            </p>

            {/* Description input */}
            <label htmlFor="blog-description" className="mb-2 mt-6 block text-sm font-medium">
              Short Description
            </label>
            <textarea id="blog-description" value={description} onChange={(event) => setDescription(event.target.value)} className='w-full rounded-lg border border-[#e8e6e0] px-3 py-2' rows={3} placeholder='A short summary for the blog card'/>

              {/* Category */}
              <label htmlFor="blog-category" className="mb-2 mt-6 block text-sm font-medium">
                Category
              </label>
              <input id='blog-category' value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-lg border border-[#e8e6e0] px-3 py-2" placeholder='For example, Friendship' />

              {/* controls to the form */}
              <label htmlFor="blog-status" className="mb-2 mt-6 block text-sm font-medium">
                Status
              </label>
              <select id="blog-status" value={status} onChange={(event) => {
                const nextStatus = event.target.value;

                if (nextStatus === "draft" || nextStatus === "published")
                  setStatus(nextStatus);
              }}
              className="w-full rounded-lg border border-[#e8e6e0] px-3 py-2">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <label className="mt-6 flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" checked={isFree} onChange={(event) => setIsFree(event.target.checked)} />
                This blog is free
              </label>

              {/* reading time and price. */}
              <label htmlFor="blog-read-time" className="mb-2 mt-6 block text-sm font-medium">
                Reading time in minutes
              </label>
              <input id='blog-read-time' type='number' min='1' step='1' value={readTimeText} onChange={(event) => setReadTimeText(event.target.value)} className="w-full rounded-lg border border-[#e8e6e0] px-3 py-2" />

              {!isFree && (
                // {!isFree && (...)} means “show the price and currency inputs only when the free checkbox is not checked.”
                // The database still needs priceAmount for free blogs,
                // so we’ll send 0 for those when we wire up saving.
                <>
                <label htmlFor="blog-price" className="mb-2 mt-6 block text-sm font-medium">
                  Price amount
                </label>
                <input id='blog-price' type='number' min='1' step='1' value={priceText} onChange={(event) => setPriceText(event.target.value)} className="w-full rounded-lg border border- px-3 py-2" />

                <label htmlFor="blog-currency" className="mb-2 mt-6 block text-sm font-medium">
                  Currency
                </label>
                <input id='blog-currency' value={currency} onChange={(event) => setCurrency(event.target.value)} className="w-full rounded-lg border border- px-3 py-2" />
                </>
              )}

              {/* Image file picker */}

              {/* type="file" opens the system’s file picker.
              accept="image/*" asks it to show image files.
              The browser gives us a list of selected files; [0] means “take the first one,”
              and ?? null means “use null if nothing was selected.” */}
              <label htmlFor="blog-cover-image" className="mb-2 mt-6 block text-sm font-medium">
                Cover image
              </label>
              <input id='blog-cover-image' type="file" accept='image/*' className='cursor-pointer text-sm text-[#57534e] file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#1c1917] file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-[#292524]'
              onChange={(event) => {
                const selectedFile = event.currentTarget.files?.[0] ?? null;
                setImageFile(selectedFile);
                setImageStorageId(null); // This matters if you choose a different image after uploading the first one: the old storage ID must not accidentally be attached to the new blog.
              }}
              />
              {imageFile && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Selected image: {imageFile.name}
                </p>
              )}

              {/* Upload button and feedback */}
              <button type='button' onClick={handleUploadImage} disabled={!imageFile || isUploading} className='mt-4 self-start'>
                {isUploading ? "Uploading image..." : "Upload image"}
              </button>

              {uploadError !== null && <p role='alert'>{uploadError}</p> }

              {imageStorageId !== null && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Image uploaded. Convex storage ID: {imageStorageId}
                </p>
              )}
              {/* 
              disabled prevents upload when there’s no file selected or while an upload is already running.
              The displayed ID confirms the result;
              later, that ID becomes coverImageId in the blog document.
               */}

              {/* Article content */}
              <label htmlFor="blog-content" className="mb-2 mt-6 block text-sm font-medium">
                Article content
              </label>
              <textarea id="blog-content" value={contentText} onChange={(event) => setContentText(event.target.value)} className="w-full rounded-lg border border-[#e8e6e0] px-3 py-2" rows={10} placeholder='Write the article here. Leave a blank line between paragraphs.'/>
                {/* 
                A <textarea> is like a bigger input for multiple lines.
                value displays what React has remembered;
                onChange updates that memory whenever you type.

                We’re keeping the article as one text string for now.
                Later, when we send it to Convex,
                we’ll split it into paragraphs because the schema expects content to be an array of strings.
                 */}

                 <Button
                 type='button'
                 onClick={handleCreateBlog}
                 disabled={isSaving || isUploading}
                 className='mt-6'
                 >
                  {isSaving ? "Saving blog..." : "Save blog"}
                 </Button>

                 {createError !== null && (
                  <p className="mt-3 text-sm text-red-600">
                    {createError}
                  </p>
                 )}

                 {createdBlogId !== null && (
                  <p role='status' className="mt-3 text-sm text-green-700">
                    Blog save. Its ID is {createdBlogId}
                  </p>
                 )}
          </div>
        )}

      <div className="my-auto py-16">
        <p className="text-sm text-muted-foreground">
          Articles and essays management content will appear here.
        </p>
      </div>
    </div>
      ) : (
        <p>You're signed in, but this account isn’t an admin.</p>
      )}
    </Authenticated>
    </>
    // Why these checks?
    // Convex first restores the sign-in session.
    // Then currentUser checks the user record.
    // Only isAdmin: true gets the admin page;
    // newly registered users start as non-admin.
  )
}
