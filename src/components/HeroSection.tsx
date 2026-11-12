import { Mail, MessageCircle, Phone, X } from "lucide-react";
import { LinkedinIcon } from "./icons/LinkedinIcon";

export function HeroSection() {
    return (
        <section className="px-10 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                {/* left side - photo */}
                <div>
                    <div className="relative overflow-hidden rounded-xl shadow-sm">
                        <img className="w-full object-cover aspect-[4/5]" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALwAyAMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABJEAABAgQDBAYHBgQEAgsAAAACAQMABBESBSEiBhMxQTJCUWFxkQcUI1KBocEVM2JysfAkgpLRQ7Lh8WSiFiUmJzQ2RFNjc8L/xAAZAQACAwEAAAAAAAAAAAAAAAAAAQIDBAX/xAAjEQACAgICAgIDAQAAAAAAAAAAAQIRAyESMQRBE1EiYXEy/9oADAMBAAIRAxEAPwDjqJAWCug0hsgCBAWBAgQSiMJthcFSABNCgVhUFAICLArCYkMy94XFp92ACRh2FzE8ZW2tAPScc0oMabC9lZGbeGXLEmyftusa1J581ikRiadZEREibHo8kgNDNSLwuCJAQ9EuUQlb6ZZFJdonY1shiGHgMw2JTEsXRMBr5pyigIbNJDbHR8RxmYkZDDZwbSKbqM0IZIVuSKnYua90TpvC5HabBDmmGxCZEV1W2qJJnRUitZGuyyWJP/JyqFJDk3KvSkyTL7djg9IShpFi4zjiQaQgVhSLDAVSDRITWFQgHEWFDDYrC0WGA4Kw+FthEV13VEf1iOMOpCAdSBCKwIYFDu4TQodrAhkhmpQd8LWCUYBAugqwSgMJVYKChSrASCEYUiwhDzADf70XEgyLpjcN0VsoF5iPVjU4RL36rdMQlKi7FC2WshJaB0xMm8ObdliuHVEmTFvSO8H+qLGwbIzuezoLGmipawxzENmBlX2RF+XcX1ch40XP9axaSMtOYfhrU00RC482twlwB1tbS+XFOdYkBaDJNiQ9G2L/AGblBmMKlZMhvAd4Lxe6pogp+vyhdqiqceOzk3pLkSan254biacqPagLWtK9i8k8YxVY7NtRhX2hITkq4Tm9FvejqyqFa/O6ONmmuL8UrVGTNGnf2BIO6EwEi0pHEWFIsIFIWiwALGHEWGkhwYBC0h0YaSFgsIByBBVgQDKJCIOrAvh6EGgxIYm6CVYK2EpAApVhHXhdtnVhKrrgGO0g0thF8GC6xhESzw0bz/mjWSRy7QCLur8PKMzg3335Y0rWFMzFpO6i93OkZ8nZuwL8dIs2piRsLdNiJe8JCvnRYs5FSmLRGKYMHGXC4hbAbrujTOLzZRlt2fHfkQB0buEUySZqhKS7RXTzzbUyTb/V6sbrYSaYCQebJxxveDoE60Ve5e3uin2u2PEXgcKYbtc6JOXU/wB4n7E7PfZx2l7Vpyn3Th21rxVK0XyiSqOiqVzTdaC2gkHGsSbedER9YFRbC27I0VVr+UlX4LHB55B9cdtERG7q8I9Mbdsj6sw9qEm+sPKqoi/rHmedQvWXLiuK5Ru+MW4lUmY8ruKGV6sFBknRgovKBYwpIQkLSAELhYQ2kLBYQCxhwF1w0kLFdYwxDlYEJXrQIQFJeUFeULX+ooNA96JExuv9MOCo9UoCtQlWigEOXj70NraZwlQKAhWXQAKFL9XVhQjCEcg96MRYGmlGhaeG3okMbHDnG2mRK3VGFkZgTZlh3lxCKjbd3xqpA96yI3RjzWdbxXFomzO8m94ROWiOkRhmTPEJc7Rc3o+S/JIjmUwE4TZaWCLp8V8KRosPwyTdAScmJy7LoiNKc+cQ6RbuT0S5p/GpvBybm569gqFZb0acM+MO7JbRFJTIb0qh0XBhnEsMxCUk7sIcKZaLSQzNEt8qxnJKQmGpwRdLURahGCS9ojGtxa0zoHpdxj1TZ6TeliH2j/S7rVX9USPPLjl+qOrel82WtnMKlymB9aF1S3XWstpd5pSORl0BjVhblHk/Zy864ycV6HyXQMJrAXoDBRcUi6woShtINIAHqwoF1jDcKFYAHUWFIsNdeFisAhxV6UCCKBAMq92XVKCo4HVhe9/DA3wwxiLy6wlB70YVeMBbfwwAEpjCVtg1bH3YQrf4ihCDtGCVsYCAXvQS3fmhWMeky9XmRc6vW8I2GGzghpIoxFxe7FtIPluRLpdWK8kbRo8fK4M3AG3MWiUSm2Xg+6mCEYyctPEFsWTeNEHvRlcWdGOVfZ03ZbDnJ1lxs5wuj7sU5yxNY8Qlb7MvhFDhm1M1LgQsXKReUT9omZrD9h57GJwiSZmiRhkuC1Nc1/pRYXFvRCWRJuVmC29xscb2kfeaK5hkUaZLkSJz+K1X4xnOpDSiUOJ0B/fZG2MUlSOXNuTbY/8A4I/m+iQgYWq/ww/m+iQyixIgOwcJRYUiwwFr04WkNqsKrAA6q64NFhHXhUIQ6sCEKsCGBC3o/lglUYSpDCVQYbRIXY2fVgt0P4oRaMChe9CEGoF1ShK7z80Hq96CVShAC4vdgr/ww40Dzpi20yREXRERrdF7hmzc0682Uy3Y3dqG5OEJulbJRi26RUtSMw7LesCOj5l3okTsHZvCNnOYWQA1LtC2JdIQ3iXEnd28oaZ2e9sXqjlx23ENqonKK+fKNl6hwnRUJJj7sLDD9cWZS7ku9u32yAvdKJTDXR0xQ5NGyME0XGxuFs+stkTYkXVui/8ATnLuf9BJfdDRGZsCIR7LST9VSJGwUqRPbwm7RjUbZS/ruAzEi0lz7o+xROIki1QvBKRPDttlGdbUUeS3W3A6TZDd7wrA6g/vsj0jgWxcviGzDuF7RSYmty2Oj0gX3kXjX9rHCNoMCmMJmX2/vWmXVHeiKp5ouYr4xpMbVFav/hh/N9EhiJIj/DfzRHUYCIoehCoSKaIVDQCoCQSQcAhysHWELAgAdugQj3YEAyGXV1CUIVOrDlIQSRNoEIg0QurdqgIka7DtlyBlp6Zesft3hAQ5CnZ4xFtJ0T42Q8J2f3oC9PEQtl0RH6rGtw/AsLP2fqbZOfluWK7ECIJNsRuFu2B9s+rzLAyxay6RXZCqpT6/vlHtaJ0ovZeuYLJygezZtc98HiFfLNPhSIz+EuNM7x2cmjBwtNxLUe6qZp5JEzC/WMQNy6ebB0RVzdviBIKUXOvIeCfDnHQ8JnpM5MsPxIWyEm/aWZBwTnx4Ema05xDaexyVrWjlMhIbp4XpZ62ZEf8AFqSknZXiqRJc+2N8HqM4Uoed26IlQ+xKLyy4eEa3aTZMpQwew0rW92pFpuGuaoKpxVVTn2w1hGBSuLYaLgvbqbJxdJ1ESRKIq8+eUNwg9sobzr/L0VDOMzjTIyuNyrMxLXXEYt9HvSlFFfCL7BWsBxDVhrgkY9JonKl45xBxbZ6clNTouPCI3ERF1eFP9/KM7NYezLvE8NtzeoXRKiiteX7484zSwxktM14/Iyxf5JUbycxxvDDFlh5to/ecJBEO9YjMbeYHLgV045NzN2oxlz1L428IYwjA5PGMElJqeZcN+b3lz5cCzKnxy+caXCcHw/D7XJaTlej0jGpVryXln3QY4qGizJkc3ZX4dtb9oPNS+Htz7QvmpkZyxLYqZqmaUVC8eKw1tJsntRNznrWH4lIOjdpJ2VETovJVRM41j2NSMppnppkfw8V8ojHtfhvRbF4x6OQoifNY1R2jM02zEy/ow9bk3RxlmTZcIt561h7iiXgoLop3pSK3F/QnYyTmFY0JOdUJpu1C/mRV/SNbtBtQyeGk3ItvCV1pXd/xijmsbmpeQateLdtuJcJFlSGoyHwXs5NtBsvjGzj27xSTJkS6JjmB+BJksU9I9QSpSONyZYTiDYzLEw3cQl4JRU7O2scM9IOyD2ymMFL6jk3NUu6XWHsXvT98YZVKNGTg4CwICIr3YKAvVgQxCq6IEF1IEKws7A/6JMJP7iemg/MIF9EjL7QejYsMn8NlWMQF0p17dDc3bZlWq5rHcESMrtan/aTZgf8AiTLyFI1OKozxm7OcH6PJrZ6fYmsQmJd5oSuEAuqSpwqipw4Qxjc44BjvdJEN2rLllGq2kfnsQxiZnCG3DW290yIlVTRFRVWnfn8IzeLMM4gZXOC0bYqQncipRFVKLTvTj3xlTjys2pPjRUys96wy5KulaRfdl39kV0rcc+w2X/uJd5wzNA9IzJNkNrjbnR74t3WRlzaEdJvEpFb3L/vD9/0d2t+joGHYphIS27EXiFyt3s8vFeeXguVaQ45PYPNver+sez3+/IRbIU7k+VM6xlJSZFqWcZIhHeDbq6qfSDBizU08Lt2ou2kSeOgUzZSe0rcpOON+vNzTTxagJsrRJVqqpVE5KvZn4xbCMrPSzpYVPNuk2KuEw45dZxXtTJFt505xzEUsMi6xF+1ibhb8xIzj8xIzBNENlpD2UWv6RBwJJmjxjEZxqcdZmZpuYb3nsxBzIUVVWvwyonfFPi4kcs+3qtLq+78KZecW4rK7QSxEIts4hapE0PA0RMyHv7u6BOSrx4aRFL/diu+1Loy5p41zhwikzL5cpqNrovPR7jkq7g8phcy3bu2EHTlatyivnksYzHWnsMx6cw8ZhzdtvezK5dQlqRP33wNkDca2hlGRbuESW4hFVWnSVFXzjQ+kWUlZTEmp5wRLfX6c9VKGlfC9V+CRTcYTr7NOJ8opmPWYcAz1EX7rGnwpd6Al0m3Buu5VSn90illMY9Ye3bDYgOQ2kKaUpVFrxXKvx8Y2+y6k1PlL3DfMN3WkORKi9Huy/wAsT+V3VF3BJWmVh4cTp3FcLZdEu+Ld7ZZ53DTIvvBG0h5FzQosZjD5hqZJsnpj1Teb1t0RQ7EXO0h42+ET5GenpiQfbYBtybbHTdkB59qVpVO2G5Mrso5aRean8DmJZwdQ2vaeSZL/AJvlF/ttgrG0OBO4e+I1P7s14tOdUk+OS9yrEMXm2cLlZpxsmVlSe3wZaFQCVU49qJ8oqpXG5idnJxwnBBtt6WISu07tSVcsuK1HzRKxUpSbdilTPP0/KPSMy7KzI2OsuK24JdVUWixHjo/prwgZLaQJ9lujWItb3+dMi+i/GObqsXFDQfuwICQdIYArogQdRgQhHqlIxm3qOfbGCPD/AIIvuEX8op+qxthGMVttO37/AHVv8KNt2S8elx8U8li7JOolWCHKRTyU63Y2MyNw+77sM7RYc3uSnGLf/kt40WnZ3pFTKzDzV3rJb0hHq2ihItM6xOnJggliF9lzdk4m7IS3a0pVCWvzTtSMXxSjJNG6UlVMx2NCMxpuL1n7wRO5SurRR8MlX4xMwpv7WxJgXbh9XvFwre1aw2+Y74nGhEWxb3bdwpXJONaV4Ra7PsDKSDkxq3j2oiHK0a5eGSRZN0LFsTi8s3LvELQ2j1RLUtO1aLziHLTW6uHVFjMPNzd1svdcWksqW8M/lEyT2el5gxbaK0/dKumGs1LbJvC+0h/DZEcTtFgbyLTbwUVp8v8AaLOW2MxCxwnXpcCKnSJeVe7viZs9L7q5sW22nJct2RW1uXlw8Is5jECae3YvCQj0itolaVVfKM8vIlf4lscSRk5vZDEg9oIjc3TU08lfD5wmenMQwwCcfmKPkKt7p1vI0XLj9P2l87trLhOFJiLLvukTlqXJxqqV/SM5i2Jzh43/ANYSossWo44NykNv4V59kWRyT9oqnCLVD2wGIPAzijzUmL08JXN2jnaqKlUTnRUpx5wx6QJqcm8HlHH2yB8S1DzFaIip8h+cV32yUpPtzGFEIC8Jt6Bola1RUTxRIRic+5NskRFcN11vG1f2sLi5TUmRpRjSKXCnJhqZlHHW9IuaiMV4JSmfFP8ASNXg05MXyk4LwiLb6F3ZoqFknj8oz7Nvvaelp8/pE0EGXZ3Y6bR6N1UHKsWZk4q0TwNSdNna8IxhmbZa3pDdb1ustVi2w6WbaBxwWxE3C1ZU4cEjl+CY+Uuy0468It7zSG7y8+Wa8e6OnYVPDOs3Db/VWMeLyZSlxkizPh4bXRgvS879n4S7uCsKZJC081VFEvNKRlZd6YDCpwd4QlvGGxL3kASyrTuHnyjW+mVlw5bCD3YlLDMrvLuNaVRPBaL5Ry4piYmJCbc31ntAtAKonWr9I3KJls6d6WsN+0NhimN2ROyBI6JF7q6S/VF+Eef6x6BwuYmMQ2bGVmycIZmW3bgmVbkIaV+sefnQJl4my0kJWkPfDqhTjWwqwdYTUYO4fdgKw6wICkX5YEAHfV22cALik27urqXj5Rj5mfKYkCGeHURXE6JUQ1qvjlwzRa+ERtkZSadumn5onRErREiUk8c4cnZIZQCuZ0k5cJgK1Ffy1zqi90Q5b4tl8YqKuK7GJghm5AZUWy9ZZL2YuVQTFUrRSomaVVU7c+5IYlD3rM3LiXsyd3mokJLVQs0Ff5cl7ojTMm40zda2YuOaTEU45IvFOOfDJeMTZcd0zaRe1cbuccyVSLx5rGlJNFOSTKueQTBx4RtbbG1sBpTOtFVPPsi8knGZeTactu9nuy5pTLKnCKxxqyWG0bScLUVtyiiIude+q5xaS+7dwoXN3qEUu92q5cPGM2fo1+IrYyaF0bdVy2iPWWuf1i7ZnSaNp60gIhT2Y8SqiVpXvhGCtS7QevTLJGROezEuzuSq865xdsFK4gGpuxwRtZIe7sVI5cvIUW1WjpyxOS72RgxOal8SFkW3AF72gibdEPTVURVyTgkVe1Djc3JterOWujeThNkg3KqJRO+JqjPNTLQkzaQ6r87q58eUWB4dJunc6y20RdIhyXeJnVMo0QyRVNHNnGVtM5dRz2ukTcHUN7yEvFOVfjFy3PvYnhstJuvWi3M2721FXo5p+nnEzaLZAjecmpa4htuIRKikvx5xS4Y3NAyZahbLUJESqoqmXCvYqxsUo5FaKKktFmTWEy8/KC68QmL6XCJJZ0uaUz+XCK3GXxDessEJNiWm3hl2RBbtmMVYl2vatk9cRDqTJF7+6L/FcME8EbcEbSGwi0rxXl8l4dqRKEK7Ypy9UPmEvNgxNNfw45DaFBt8UWJQMyrssTL84I26WxtyqvOqKidi598U75My8tc0LgOiKfe36qdlcuEV6TTjoD7O4vw6kglGVUh42k7ZsTwyYvbbaHfNNj0hKlufP+0dE2WApKQESebISoIkJIoj3L/eOSYbPT0uBbgng02kIjpJOKLRfj8o2Wwm1Uve3hs62QE85cLglkRV+uSRzZeNkhJNvo2zzRyRaRpfSsLZbGPuF0gcAm+2qrT9FWOKSYOHIP6dNyarcuP+sdM9M87czh2FiRWvFvnPBMk/VfJIx1rYYaUqIkQkKEVoogkvL9846EcvH0YeFnQsCYvwfC2S0ueqIQl9P32Rw7brDvsza3E5e0h9pvBu/FQvrHa2ZwpJmULo7ujdo55URF+VYxvpvwn+Pk8aaG5qYbRhwvxItU+VfKLHJMJp0cnDrfl+sKVCBkSt60XOE4g3KbsiJz8o5/WNa/tvhMxhTEjiGCliDbIrbv3rbV5KlKr84gV0c7dXQJe8P+n0gRdz+I4fN6WMDkpcera46pf5qfKBDCiI4T0jY9KOONOe8JUWuS0+aRq28VnpuQFmb3btw9Ihov8Ab5RVT6ycxhss2wLm9F9XCcIaIQqgpT4UWJsknRGFlS7Nfj77J7Cve0eJsSIiS2wchROfbXj5wROsmYjpH+ahV8OcT5cdEQsVYbMNQiUKGVrssy+LF7RX4xNMy4EMt95bpIrUUfD58oRs885MYa2N1rbZaiLrrVaInbxr5Rn5wnAmRbG4wIrbCLLONDJALTLEm193bqu0rX3u6lFXOLJrkjNiuMqZsmGidw1iXYcK4W1IdPSpCZOVeaeYHeNhq3ltyKvZVEiJK4lJuybbYkJi2NokNRW2i8lziTKOSu5FwhsIqdbPJKxxPjm240dxzgkpWTp+dmCxhtvpbsbiIacKZrwiYk0LXtmhEx6LgDkvai0+MVq4k2E+BdURXyyiUKyM3ONzDjbZbkbri4iueUWaxUmjFLDLJckxyYxOVaOZF1wfZt3OW6rU51ondz7Ujkk5ic07vJdj7gi0hbXn31jtao2bJOSxWuOFcQj1/FOcUUvhMvh8y64UjL7/AKV4Z2qiZ5Z9saMWWEU2jHPlaTMrh0j9mMyguja5arjludy0rkvhE0nx+zXG55wmnLrhaAUtoqoiHnxSmSLw7ImT0rNTD0t7O0nKkI8VtRMvCucSsSwuclcNebQWwYJpXbLc1Tjl5Rbj8iKpSe2w+GUk5JdGcxFXPUyF1wnbRubIadlKLlxitbYI/wD0/wDynUsuSJF5LITTzBERC30brbslXgkaVyQcCWBxhuVE3nFER3iop0VaJXtr5pzzSNM5UyuEdFLszhhTDwk7Jio26bmz51TLPP4xazWDFKSEs8IkZNzLjglaqlbTt8UjVbMy7zN1zcwpM1HUS8OKc9SohLFm2bJyZC1cN0ygjaPYSCvDlxX4xnlklf6LKS/pyP0gTk1MbTk4TloMsN7kSFS0qlVTzVYhPub20pZ7T1hzqS1rxr+6RbekeXE5mUmnS+7qw4WVCpqFVTvuVP5YzUmegm2uj0biz8olJ/Q4RTezebP4i86csOKbybYbcQhcDp14fH9+EbLbDCsJxvZVyTfm5eXaL2jL7jiCgGnRXPwVF+MYTYnCWcTxIRmZpxkBHosFYpJ2VTlGi9K0vhmH7EvyEpLiDpKLgoPSyXMlXiuVUz7YUG97HlrVI4CTZNGTZWkQko3CVyZL2pEprDZ52QfnmpVwpSXpvHeqNVonzWI8kuu2OgyCf93uNsj0dzd5KixY20ZkkznzK3mNuqBDUodht/8A2QIkRN7iv/lXARErt45Ml5GiQzIhFhtJLhLYZgcu2pKAC9bctVzPOKu8haokKWzb4+o2W5zQtB+KKbEcRIw6JCP5YU1qKqw8oD2RFJE5SbMbMukcyJD0ro0aTjkuZNlbaVB0tii5cUX4rWndCZ3D5ZTByzWi1rFFNuGsxaqxeqaMklJOzRKLYBaJDvOlfd3UpXwzif6wQA0I6ibHpdG5YpsNbRwGCNVVVOq1XviY+e7mXUER08KpEJRq2SjK9MtLnHfaCLlvRu5Vi9wSabaAm3bdJW2iNV74qMDNSlN4Wa2U7ok4Sm8nzAlyUs45Wa3dnXwpLom4vMzUvIFuy3JE8m7IeNK1/ROEXsu/Lu7PutuYqzLTW7tJwm1pn7uarXzjLbQOHQQU1UBCqCvBMoq5RVKZJTW63giw4Y1wTMtrJmlCtr2aWUxMfWZZ58b9y2rdwXXHUaVrlSNC/PYftFZJvNkybgqAu3e8iolU7lWMXNPExLobaJWtM+ER2Jt1xarRFFaoqdsHDfJFzxpKjYYpsu9JSws3Db7wjlzqkW09KNtbhstJesNmNzYlcih4e8JRocPcWewKWefRFNQRcss4hKCE405UkLSmRKmVv+qxpu0YrV0yTKs7oHXLfaWoOku7h3cOXZGfPExCZulhG4ZkyeHJLqqv78s41TC0ln65qK0qqZ8v7xzSSO/aGZbUARBmbskz6SjTw4eUVSbg9E8cIztsHpWw1sMBcnGiEhF0HNOa1qo//qOcSLogHSjS7U4nM4lic3hT5IMreiIIZURCy7ou3tmsIw3AHH2pMHXVGlzyqVPhwi55LSIxjWzO4RjBSMyLzDlrgxczMw5jYOlMuE6bg2kReEUzMhKkNyMiK/hyi2whsQdoPDsiX7FJ2crlwJqc3ZaSFy0vGOh4Il+yuON/8IZf8q/2jFYwAhtFMoKZK+pL41WNvstRzDcVbNKgsqaU/lWJydxMyWzmLS9H80CA10/5oEWFdH//2Q==" alt="Asiimire Patricia" />

                        {/* layer 2: the fade */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/70 via-white/40 to-transparent" />

                        {/* layer 3: the thick line */}
                        <div className="absolute inset-x-3 bottom-4 h-4 rounded-[4px] bg-white shadow-sm" />
                    </div>


                    <div className="mt-4">
                        <h3 className="font-medium text-[17px]">Asiimire Patricia</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">Founder of The MOTOFIX Report</p>
                    </div>
                </div>


                {/* Right side - Content */}
                <div className="pt-1">
                    <div className="flex items-center gap-3 mb-5">
                        <span className="text-[11px] font-medium tracking-[0.15em] text-muted-foreground uppercase">
                            Authorial Focus
                        </span>
                        <div className="flex-1 max-w-20 h-px bg-border" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-medium leading-snug mb-6">
                        Writing at the intersection of <i>quiet computing</i>, spatial architecture, and enduring software.
                    </h2>

                    <p className="text-[#44403c] leading-relaxed mb-6">
                        Over the last fifteen years, I have drafted distributed fault-tolerant topologies by day and examined the subtle erosion of cognitive silence by night. The MOTOFIX Report Report is an archival venue for unhurried prose—deliberate investigations into digital ergonomics, high-leverage simplicity, and technologies built to outlast market frenzy.
                    </p>

                    <p className="text-[#44403c] leading-relaxed mb-8">
                        Every piece published here undergoes iterative revisions, typographic tuning, and empirical review. Supported solely through independent patronage and direct subscriber micro-patronage. No algorithms, no ad tracking, no performative urgency.
                    </p>

                    {/* Contact info */}
                    <div className="mt-10 pt-6 border-t border-border" >
                        {/* label with hairline - same pattern as Authorial focus */}
                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-[11px] font-medium tracking-[0.15em] text-muted-foreground uppercase">Direct Inquiries & Corroboration</span>
                            
                            </div>

                        {/* contact row: email, phone, whatsapp */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 text-sm text-[#44403c]">
                            <a href="mailto:aiimirepatricia26@gmail.com" className="flex items-center gap-2.5 hover:text-[#1c1917] transition-colors">
                                <Mail aria-hidden="true" className="size-4 text-muted-foreground" />
                                <span>asiimirepatricia26@gmail.com</span>
                                </a>
                            <a href="tel:+256758969973" className="flex items-center gap-2.5 hover:text-[#1c1917] transition-colors" >
                                <Phone aria-hidden="true" className="size-4 text-muted-foreground" />
                                <span>+256758969973</span>
                            </a>
                            <a href="#" className="flex items-center gap-2.5 hover:text-[#1c1917] transition-colors" >
                                <MessageCircle aria-hidden="true" className="size-4 text-muted-foreground" />
                                <span>WhatsApp</span>
                            </a>
                        </div>

                        {/* social media row */}
                        <div className="flex items-center gap-6 mt-5 text-sm text-[#78716c]">
                            <a href="https://www.linkedin.com/in/patricia-asiimire-38b936236/" className="flex items-center gap-2.5 hover:text-[#1c1917] transition-colors" >
                                <LinkedinIcon aria-hidden="true" className="size-3.5" />
                                <span>LinkedIn</span>
                            </a>
                            <a href="#" className="flex items-center gap-2.5 hover:text-[#1c1917] transition-colors" >
                                <X aria-hidden="true" className="size-3.5" />
                                <span>@motofixug</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default HeroSection;