import DSNForm from '@/components/DSNForm';

export default function Home() {
  return (
    <main className='flex min-h-screen items-center bg-gray-600'>
      <div className='container mx-auto max-w-lg p-10'>
        <div className='mb-10 text-center text-white'>
          <h1 className='mb-5 text-3xl'>DSN Generator</h1>
          <p className='text-sm'>
            The following form can be used to generate DSN strings which can be
            used to define connection configs in e.g.{' '}
            <a className='underline' href='https://cakephp.org' target='_blank'>
              CakePHP
            </a>
          </p>
        </div>
        <DSNForm />
        <div className='mt-10 text-center text-xs text-white'>
          <p>
            All data is generated client-side.
            <br />
            No data stored, neither on webserver or your browser.
            <br />
            Don&apos;t trust me? Check out the repo on{' '}
            <a
              className='underline'
              href='https://github.com/LordSimal/cakephp-dsn-generator'
              target='_blank'
            >
              Github
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
