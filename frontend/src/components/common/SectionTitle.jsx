export default function SectionTitle({

    title,

    subtitle,
}){

    return(

        <div className="space-y-2">

            <h2
                className="
                    text-4xl
                    font-bold
                "
            >

                {title}

            </h2>

            <p
                className="
                    text-zinc-400
                "
            >

                {subtitle}

            </p>

        </div>
    );
}