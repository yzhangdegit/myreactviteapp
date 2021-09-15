export interface HelloProps {
    name?: string
}
export function Hello(props: any) {
    return (
        <div>
            {`hello ${props?.name}`}
        </div>
    )
}