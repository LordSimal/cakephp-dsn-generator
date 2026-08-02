import Conditional from '@/components/Generics/Conditional'
import FormInput from '@/components/Generics/FormInput'
import FormSelect from '@/components/Generics/FormSelect'
import { DSNData } from '@/types'
// @ts-ignore
import timezones from 'google-timezones-json'

export default function Optional({
  isPostgres,
  values,
  onChange,
}: {
  isPostgres: boolean
  values: DSNData
  onChange: (name: string, value: string | boolean) => void
}) {
  const myTimezones: Record<string, string> = {
    '': 'None',
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
            value={values.schema}
            onChange={onChange}
          />
        </Conditional>

        <FormSelect
          name="timezone"
          label="Timezone"
          className="col-span-6"
          options={myTimezones}
          value={values.timezone}
          onChange={(e) => onChange('timezone', e.target.value)}
        />

        <FormInput
          type="text"
          name="init"
          className="col-span-6"
          label="SQL init command"
          value={values.init}
          onChange={onChange}
        />
        <FormInput
          type="checkbox"
          name="enable_querylogging"
          className="col-span-6 flex items-center"
          label="Enable query logging"
          value={values.enable_querylogging}
          onChange={onChange}
        />
      </div>
    </details>
  )
}
