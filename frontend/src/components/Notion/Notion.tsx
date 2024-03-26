export function Notion() {
    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <h2 className="text-2xl font-bold tracking-tight">Notion Playground</h2>
                    </div>
                </div>
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <p>Before yoy set a page id, you need to set the Notion token in Settings</p>
                </div>
            </div>
        </>
    )
}