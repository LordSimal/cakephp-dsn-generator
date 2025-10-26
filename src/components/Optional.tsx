import Conditional from '@/components/Generics/Conditional'
import FormInput from '@/components/Generics/FormInput'
import FormSelect from '@/components/Generics/FormSelect'
// @ts-ignore
import timezones from 'google-timezones-json'

export default function Optional({
  isPostgres,
  cleanValue = false,
}: {
  isPostgres: boolean
  cleanValue: boolean
}) {
  // let defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const emptyOption = { '': 'None' }
  const myTimezones = {
    ...emptyOption,
    ...timezones,
  }

  return (
    <details className="my-5">
      <summary className="text-md cursor-pointer bg-inherit">Optional</summary>
      <div className="mt-3 grid grid-cols-6 gap-6 bg-white text-sm font-light">
        <Conditional showWhen={isPostgres}>
          <FormInput
            type="text"
            name="schema"
            className="col-span-6"
            label="Schema"
            cleanValue={cleanValue}
          />
        </Conditional>

        <FormSelect
          name="timezone"
          label="Timezone"
          className="col-span-6"
          options={myTimezones}
        />

        <FormInput
          type="text"
          name="init"
          className="col-span-6"
          label="SQL init command"
          cleanValue={cleanValue}
        />
        <FormInput
          type="checkbox"
          name="enable_querylogging"
          className="col-span-6 flex items-center"
          label="Enable query logging"
          cleanValue={cleanValue}
        />
      </div>
    </details>
  )
}
