import Conditional from '@/components/Conditional';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
// @ts-ignore
import timezones from 'google-timezones-json';

export default function Optional({ isPostgres }:{isPostgres: boolean}) {
  // let defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const emptyOption = { '': 'None' };
  const myTimezones = {
    ...emptyOption,
    ...timezones,
  };

  return (
    <details className="my-5">
      <summary className="bg-inherit text-md cursor-pointer">Optional</summary>
      <div className="bg-white text-sm font-light grid grid-cols-6 gap-6 mt-3">

        <Conditional showWhen={isPostgres}>
          <FormInput type="text" name="schema" className="col-span-6" label="Schema"/>
        </Conditional>

        <FormSelect name="timezone"
                    label="Timezone"
                    className="col-span-6"
                    options={myTimezones}
        />

        <FormInput type="text" name="init" className="col-span-6" label="SQL init command"/>
        <FormInput type="checkbox" name="enable_querylogging" className="col-span-6 flex items-center" label="Enable query logging"/>

      </div>
    </details>
  );
}
