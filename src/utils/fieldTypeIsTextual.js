export default function fieldTypeIsTextual(fieldType) {
	const textualFieldTypes = {
		'text': true,
		'text-long': true,
		'url': true,
		'email': true,
		'tel': true,
		'number': true
	};

	return (!!textualFieldTypes[fieldType]);
};
