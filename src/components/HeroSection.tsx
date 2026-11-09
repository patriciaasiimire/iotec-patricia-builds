// 1. We import visual vector icons by name from our global workspace package.
// 2. These work like custom HTML tags to draw icons instantly.
// 1. We import visual vector icons by name from our global workspace package.
// 2. These work like custom HTML tags to draw icons instantly.
import { Mail, Phone, MessageSquare } from 'lucide-react'

export function HeroSection() {
    return (
        <section className='w-full bg-background text-foreground'>
            <div className='mx-auto grid max-w-5xl items-start gap-12 px-6 py-16 md:grid-cols-[1fr_1.5fr'>
                {/* left column contents. image holder, name and title strings */}
                {/* 'flex flex-col gap-4' stacks the photo box directly above the name block with 16px of air. */}
                <div className="flex flex-col gap-4">
                    {/* Image wrapper frame controlling corners ('rounded') and matching background placeholder theme colors. */}
                    <div className="overflow-hidden rounded border border-border/40 bg-muted">
                        <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ZZzKyORIE77fdsTlRED5Z-SKJEdeSyhx8R_GImQD7g&s=10"
                        alt="Patricia Asiimire Portrait"
                        className='w-full object-cover grayscale brightness-95'
                        />
                    </div>

                    {/* Biographical text labels stacked tightly using 4px of separation ('gap-1') */}
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm font-semibold tracking-tight text-foreground">
                            Asiimire Patricia
                        </h2>
                        <p className="text-[11px] leading-normal text-muted-foreground">
                            Co-Founder MOTOFIX
                        </p>
                    </div>
                </div> {/* Closes Left Column */}
                {/* Right column: headline & content copy */}
                {/* 'flex flex-col gap-8' separates main typography blocks from the link grid area below it */}
                <div className="flex flex-col gap-8">

                    {/* top headline block */}
                    <div className="flex flex-col gap-3">
                        {/* the small red tag. 'tracking widest' stretches individual characters. */}
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#B23B2B]">
                            Authorial Focus
                        </span>
                        {/* 'font-serif': switches typography instantly to a high-end publication serif style */}
                        <h1 className="font-serif text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl">
                            Writing at the intersection of <em className="italic font-medium text-foreground"> uiet computing</em>, spatial architecture, and enduring software.
                        </h1>
                    </div>

                    {/* Main prose copy block */}
                    {/* 'text-[13px] leading-relaxed': standard editorial layout rule. Small print requires wider row gaps toscan easily. */}
                    <div className="flex flex-col gap-5 text-[13px] leading-relaxed text-muted-foreground/90">
                        <p>
                            Over the last fifteen years, I have drafted distributed fault-tolerant topologies
              by day and examined the subtle erosion of cognitive silence by night. MOTOFIX is an archival venue for unhurried prose—deliberate investigations into
              digital ergonomics, high-leverage simplicity, and technologies built to outlast
              market frenzy.
                        </p>
                        <p>
                            Every piece published here undergoes iterative revisions, typographic tuning, and empirical
              review. Supported solely through independent patronage and direct subscriber micro-patronage.
              No algorithms, no ad tracking, no performative urgency.
                        </p>
                    </div>

                    {/* footer area: direct inquiries & badges */}
                    {/* 'border-t pt-6' creates the thin separator stroke line directly above the badges list*/}
                    <div className="border-t border-border/60 pt-6">
                        <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
                            Direct Inquiries &amp; Corroboration
                        </h3>

                        {/* the badge engine:
                        - 'flex flex-wrap gap-2': key safety grid rule. if opened on mobile, links wrap down into clear rows automatically. */}
                        <div className="flex flex-wrap gap-2">
                            {/* email badge component box */}
                            <div className="flex items-center gap-1.5 rounded border border-border/80 bg-muted/20 px-2.5 py-1.5 text-[11px] text-foreground">
                            {/* 'size-3.5' scales the Lucide icon graphic down uniformly to 14px by 14px. */}
                            <Mail className="size-3.5 text-muted-foreground"/>
                            <span>asiimirepatricia26@gmail.com</span>
                            </div>

                            {/* Phone badge component box */}
                            <div className="flex items-center gap-1.5 rounded border border-border/80 bg-muted/20 px-2.5 py-1.5 text-[11px] text-foreground">
                                <Phone className='size-3.5 text-muted-foreground'/>
                                <span>+256 758 969 973</span>
                            </div>

                            {/* WhatsApp */}
                            <div className="flex items-center gap-1.5 rounded border border-border/80 bg-muted/20 px-2.5 py-1.5 text-[11px] text-foreground">
                                <Phone className='size-3.5 text-muted-foreground'/>
                                <span>WhatsApp</span>
                            </div>

                            {/* Linkedin badge component box */}
                            <div className="flex items-center gap-1.5 rounded border border-border/80 bg-muted/20 px-2.5 py-1.5 text-[11px] text-foreground">
                                {/* inline SVG vector for linkedin */}
                                <svg
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth="2"
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='size-3.5 text-muted-foreground'
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect width="4" height="12" x="2" y="9"/>
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                                <span>LinkedIn</span>
                            </div>

                            {/* Twitter badge component box */}
                            <div className="flex items-center gap-1.5 rounded border border-border/80 bg-muted/20 px-2.5 py-1.5 text-[11px] text-foreground">
                                {/* inline SVG vector for linkedin */}
                                <svg
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth="2"
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='size-3.5 text-muted-foreground'
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                </svg>
                                <span>Twitter</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}