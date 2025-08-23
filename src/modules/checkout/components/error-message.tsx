const ErrorMessage = ({ error }: { error?: string | null }) => {
    if (!error) return null

    return (
        <div className="pt-2 text-destructive-foreground text-sm font-normal">
            <span>{error}</span>
        </div>
    )
}

export default ErrorMessage