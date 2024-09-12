'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    return (
        <html>
            <body style={{
                display: 'flex',
                flexDirection: 'column',

            }}>
                <h2 style={{
                    color: 'aqua'
                }}>Something went wrong!</h2> <br />
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    )
}