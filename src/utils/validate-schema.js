export default function validateSchema(schema, input) {
    const validated = schema.validate(input, { abortEarly: false });
    if (validated.error) {
        const result = validated.error.details.reduce((acc, item) => {
            const { message, path } = item;
            acc[path[0]] = message;
            return acc;
        }, {});

        return result;
    }
}
