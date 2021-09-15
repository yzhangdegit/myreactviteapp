import styles from './index.module.less'

export interface HelloProps {
    name?: string | undefined | null
}
export function Hello(props: HelloProps): React.ReactElement {
    const { name } = props
    return (
        <div className={styles.container}>
            {`hello ${name}`}
        </div>
    )
}