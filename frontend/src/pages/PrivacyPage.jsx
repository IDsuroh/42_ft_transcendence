function PrivacyPage()  {
    return (
        <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
            <section className="w-full max-w-2xl rounded-2xl bg-slate-900 p-8 shadow-lg">
                <h1 className="text-3xl font-bold">Privacy Policy</h1>

                <div className="mt-6 space-y-4 text-slate-300">
                    <p>
                        This project is a student web application created for the 42 Transcendence project.
                    </p>

                    <p>
                        We collect only the information needed to create and manage user accounts, such as username,
                        email address, and authentication data.
                    </p>

                    <p>
                        Passwords are not stored in plain text. They are processed by Django&apos;s authentication
                        system and stored as password hashes.
                    </p>

                    <p>
                        Session cookies are used to keep users logged in. CSRF cookies are used to protect unsafe
                        requests such as login, signup, and logout.
                    </p>

                    <p>
                        This application is intended for educational use. Do not enter sensitive personal information
                        beyond what is necessary for testing the project.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default PrivacyPage