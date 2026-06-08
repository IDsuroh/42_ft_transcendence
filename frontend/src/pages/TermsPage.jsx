function TermsPage()    {
    return (
        <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
            <section className="w-full max-w-2xl rounded-2xl bg-slate-900 p-8 shadow-lg">
                <h1 className="text-3xl font-bold">Terms of Service</h1>

                <div className="mt-6 space-y-4 text-slate-300">
                    <p>
                        This application is a student project created for educational purposes as part of the 
                        42 Transcendence project.
                    </p>

                    <p>
                        Users are expected to use the application respectfully and only for legitimate testing and
                        project-related activity.
                    </p>

                    <p>
                        Account access is protected through Django authentication, session cookies, and CSRF protection.
                        Users should not attempt to access another user&apos;s account or interfere with the service.
                    </p>

                    <p>
                        The application may change during development. Features, data, and accounts may be reset or
                        modified as the project evolves.
                    </p>

                    <p>
                        By using this project, you understand that it is an educational application and not a production
                        commercial service.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default TermsPage