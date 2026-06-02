import GlowOrb from "../common/GlowOrb";
import GradientText from "../common/GradientText";

export default function AuthLayout({ children }) {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050816]
        text-white
      "
    >
      <GlowOrb
        className="
          top-[-200px]
          left-[-200px]
          h-[500px]
          w-[500px]
        "
      />

      <GlowOrb
        className="
          bottom-[-200px]
          right-[-200px]
          h-[500px]
          w-[500px]
          bg-violet-500
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          min-h-screen
          max-w-[1440px]
          px-6
          lg:px-12
          xl:px-20
        "
      >
        <div
          className="
            grid
            min-h-screen
            items-center
            gap-12
            lg:grid-cols-2
          "
        >
          {/* LEFT */}
          <div
            className="
              hidden
              lg:flex
              flex-col
              justify-center
              max-w-[650px]
            "
          >
            <div
              className="
                mb-8
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
                AI Powered Interview Platform
              </span>
            </div>

            <h1
              className="
                text-6xl
                xl:text-7xl
                font-black
                leading-[0.95]
                tracking-[-3px]
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
          </div>

          {/* RIGHT */}
          <div
            className="
              flex
              items-center
              justify-center
            "
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}