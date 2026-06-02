export default function Card({

    children,

    className = "",
}){

    return(

        <div
            className={`
                bg-[rgba(17,25,40,0.75)]
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                shadow-[0_0_40px_rgba(0,0,0,0.3)]
                ${className}
            `}
        >

            {children}

        </div>
    );
}