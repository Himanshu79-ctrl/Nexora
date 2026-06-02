export default function GlowOrb({

    className = "",
}){

    return(

        <div
            className={`
                absolute
                rounded-full
                blur-[120px]
                opacity-20
                bg-cyan-500
                ${className}
            `}
        />
    );
}