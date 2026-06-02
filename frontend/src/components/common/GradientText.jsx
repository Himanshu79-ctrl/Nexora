export default function GradientText({
    children
}){

    return(

        <span
            className="
                bg-gradient-to-r
                from-cyan-400
                via-violet-500
                to-pink-500
                bg-clip-text
                text-transparent
            "
        >

            {children}

        </span>
    );
}