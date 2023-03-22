export default function movie({ params }) {
    const [title, id] = params || [];;

    return (
        <>
            <h3>{title}</h3>
        </>
    )
}

export function getServerSideProps({ params: { params } }) {
    return {
        props: {
            params,
        },
    };
}