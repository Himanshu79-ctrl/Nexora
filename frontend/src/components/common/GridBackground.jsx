export default function GridBackground(){

    return(

        <div
            className="
                absolute
                inset-0
                z-0
                opacity-[0.07]
            "
        >

            <div
                className="
                    h-full
                    w-full
                    bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]
                    bg-[size:40px_40px]
                "
            />

        </div>
    );
}