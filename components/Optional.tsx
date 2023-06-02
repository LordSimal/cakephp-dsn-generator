import Conditional from "@/components/Conditional";
import FormInput from "@/components/FormInput";

export default function Optional({isPostgres}:{isPostgres: boolean})  {
  return (
    <details className="my-5">
      <summary className="bg-inherit text-md cursor-pointer">Optional</summary>
      <div className="bg-white text-sm font-light grid grid-cols-6 gap-6 mt-3">

        <Conditional showWhen={isPostgres}>
          <FormInput type="text" name="schema" className="col-span-6" label="Schema"/>
        </Conditional>

        <FormInput type="text" name="timezone" className="col-span-6" label="Timezone"/>

      </div>
    </details>
  )
}
