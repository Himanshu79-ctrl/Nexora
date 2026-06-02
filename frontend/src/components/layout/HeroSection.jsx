import { Link } from "react-router-dom";

import Button from "../common/Button";

export default function HeroSection(){

    return(

        <section
            className="
                relative
                overflow-hidden
                bg-[#050816]
                text-white
            "
        >

            {/* Glow Effects */}

            <div
                className="
                    absolute
                    left-[-120px]
                    top-[-120px]
                    h-[320px]
                    w-[320px]
                    rounded-full
                    bg-cyan-500/20
                    blur-[120px]
                "
            />

            <div
                className="
                    absolute
                    bottom-[-120px]
                    right-[-120px]
                    h-[320px]
                    w-[320px]
                    rounded-full
                    bg-violet-500/20
                    blur-[120px]
                "
            />

            {/* Grid */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    grid
                    min-h-screen
                    max-w-[1400px]
                    items-center
                    gap-20
                    px-6
                    pt-32
                    pb-20
                    lg:grid-cols-2
                    lg:px-12
                "
            >

                {/* LEFT */}

                <div
                    className="
                        max-w-3xl
                    "
                >

                    {/* Badge */}

                    <div
                        className="
                            mb-8
                            inline-flex
                            items-center
                            gap-3
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.04]
                            px-5
                            py-2.5
                            backdrop-blur-xl
                        "
                    >

                        <div
                            className="
                                h-2.5
                                w-2.5
                                rounded-full
                                bg-cyan-400
                            "
                        />

                        <span
                            className="
                                text-sm
                                text-zinc-300
                            "
                        >

                            AI Powered Interview Experience

                        </span>

                    </div>

                    {/* Heading */}

                    <h1
                        className="
                            text-5xl
                            font-black
                            leading-[0.95]
                            tracking-[-2px]
                            sm:text-6xl
                            lg:text-7xl
                            xl:text-[96px]
                        "
                    >

                        Master

                        <br />

                        Your Next

                        <br />

                        <span
                            className="
                                bg-gradient-to-r
                                from-cyan-400
                                to-violet-500
                                bg-clip-text
                                text-transparent
                            "
                        >

                            AI Interview

                        </span>

                    </h1>

                    {/* Description */}

                    <p
                        className="
                            mt-8
                            max-w-2xl
                            text-lg
                            leading-relaxed
                            text-zinc-400
                            lg:text-xl
                        "
                    >

                        Practice realistic AI-powered
                        technical interviews with
                        adaptive questioning,
                        intelligent voice interaction,
                        and real-time personalized feedback.

                    </p>

                    {/* Buttons */}

                    <div
                        className="
                            mt-12
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                        "
                    >

                        <Link to="/register">

                            <Button
                                className="
                                    w-full
                                    sm:w-auto
                                "
                            >

                                Start Interview

                            </Button>

                        </Link>

                        <button
                            className="
                                h-14
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/[0.04]
                                px-8
                                font-semibold
                                text-white
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:bg-white/[0.08]
                            "
                        >

                            Watch Demo

                        </button>

                    </div>

                    {/* Stats */}

                    <div
                        className="
                            mt-16
                            flex
                            flex-wrap
                            gap-10
                        "
                    >

                        <div>

                            <h3
                                className="
                                    text-3xl
                                    font-black
                                "
                            >

                                10K+

                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-zinc-500
                                "
                            >

                                Mock Interviews

                            </p>

                        </div>

                        <div>

                            <h3
                                className="
                                    text-3xl
                                    font-black
                                "
                            >

                                95%

                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-zinc-500
                                "
                            >

                                Success Rate

                            </p>

                        </div>

                        <div>

                            <h3
                                className="
                                    text-3xl
                                    font-black
                                "
                            >

                                24/7

                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-zinc-500
                                "
                            >

                                AI Availability

                            </p>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE UI MOCKUP */}

                <div
                    className="
                        relative
                        mx-auto
                        flex
                        w-full
                        max-w-[520px]
                        justify-center
                    "
                >

                    <div
                        className="
                            relative
                            w-full
                            rounded-[36px]
                            border
                            border-white/10
                            bg-white/[0.04]
                            p-6
                            backdrop-blur-2xl
                        "
                    >

                        {/* Top */}

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-sm
                                        text-zinc-500
                                    "
                                >

                                    AI Interview Session

                                </p>

                                <h3
                                    className="
                                        mt-2
                                        text-xl
                                        font-bold
                                    "
                                >

                                    Frontend Developer

                                </h3>

                            </div>

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-cyan-400
                                    to-violet-500
                                    text-2xl
                                "
                            >

                                🤖

                            </div>

                        </div>

                        {/* Question */}

                        <div
                            className="
                                mt-8
                                rounded-3xl
                                border
                                border-white/10
                                bg-[#0B1120]
                                p-6
                            "
                        >

                            <p
                                className="
                                    text-sm
                                    text-zinc-500
                                "
                            >

                                Current Question

                            </p>

                            <p
                                className="
                                    mt-4
                                    text-lg
                                    leading-relaxed
                                    text-zinc-200
                                "
                            >

                                Explain the difference between
                                React Virtual DOM and Real DOM.

                            </p>

                        </div>

                        {/* Voice */}

                        <div
                            className="
                                mt-8
                                flex
                                items-center
                                justify-center
                                gap-2
                            "
                        >

                            <div className="h-10 w-1 rounded-full bg-cyan-400 animate-pulse" />
                            <div className="h-16 w-1 rounded-full bg-cyan-400 animate-pulse" />
                            <div className="h-8 w-1 rounded-full bg-cyan-400 animate-pulse" />
                            <div className="h-20 w-1 rounded-full bg-cyan-400 animate-pulse" />
                            <div className="h-12 w-1 rounded-full bg-cyan-400 animate-pulse" />

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}