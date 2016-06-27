export default function resolveFields({ fields, fieldSpecs }) {
  return fields.map((field) => 
    (typeof field === 'string') ? ({
      id: field,
      ...fieldSpecs[field]
    }) : (
      field
    )
  );
}
