export default function FloatingParticles(){

    return(

        <>
            <div
                className="
                    absolute
                    top-20
                    left-20
                    w-72
                    h-72
                    bg-cyan-500/20
                    blur-[120px]
                    rounded-full
                "
            />

            <div
                className="
                    absolute
                    bottom-10
                    right-10
                    w-72
                    h-72
                    bg-violet-500/20
                    blur-[120px]
                    rounded-full
                "
            />
        </>
    );
}