import GradientText from "../common/GradientText";

export default function AuthLeftPanel() {
    return (
        <div
            className="
                hidden
                lg:flex
                flex-col
                justify-center
                max-w-xl
            "
        >
            <div
                className="
                    inline-flex
                    w-fit
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-2
                    backdrop-blur-xl
                    mb-8
                "
            >
                <div
                    className="
                        h-3
                        w-3
                        rounded-full
                        bg-cyan-400
                        animate-pulse
                    "
                />

                <span
                    className="
                        text-sm
                        text-zinc-300
                    "
                >
                    AI Powered Interview Platform
                </span>
            </div>

            <h1
                className="
                    text-6xl
                    xl:text-7xl
                    font-black
                    leading-[0.95]
                    tracking-tight
                "
            >
                Ace Your

                <br />

                Next

                <br />

                <GradientText>
                    AI Interview
                </GradientText>
            </h1>

            <p
                className="
                    mt-8
                    max-w-xl
                    text-lg
                    xl:text-xl
                    leading-relaxed
                    text-zinc-400
                "
            >
                Practice realistic AI-powered interviews
                with adaptive questioning, voice interaction,
                and real-time intelligent feedback.
            </p>

            <div
                className="
                    mt-12
                    flex
                    items-center
                    gap-4
                "
            >
                <div
                    className="
                        h-14
                        w-14
                        rounded-2xl
                        bg-gradient-to-br
                        from-cyan-400
                        to-violet-500
                    "
                />

                <div>
                    <h3
                        className="
                            text-lg
                            font-bold
                        "
                    >
                        AI Mock Interview
                    </h3>

                    <p
                        className="
                            text-zinc-500
                        "
                    >
                        Real-time intelligent hiring prep
                    </p>
                </div>
            </div>
        </div>
    );
}