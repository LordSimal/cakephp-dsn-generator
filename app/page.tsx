import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center bg-gray-600">
      <div className="container mx-auto max-w-lg p-10">
        <div className="text-center text-white mb-10">
          <h1 className="text-3xl mb-5">DSN Generator</h1>
          <p className="text-sm">
            The following form can be used to generate DSN strings which can be used to
            define connection configs in e.g. <a className="underline" href="https://cakephp.org" target="_blank">CakePHP</a>
          </p>
        </div>
        <Form/>
        <div className="text-center text-white mt-10 text-xs">
          <p>
            All data is generated client-side.<br/>
            Don&apos;t trust me? Check out the repo on <a className="underline" href="https://github.com/LordSimal/cakephp-dsn-generator" target="_blank">Github</a></p>
        </div>
      </div>
    </main>
  )
}
