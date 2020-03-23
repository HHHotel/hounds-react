export const add = (a: number, b: number) => {
    return a + b;
};

/*
Right now i do this:
    <FormModal>
        if (thisthing) {
            <thisthingForm />
        } else {
            <otherthingForm />
        }
    </FormModal>

I want to do this

const formSchema = {
    dogName: Form.string,// WIP i need type information to map the correct input
    clientName: Form.string,
}

<FormModal>
    <StructuredForm schema={formSchema} onSubmit={requestApi} />
</FormModal>

more interestingly

const formSchema = [
    {
        component: HoundsSearch,
    },
    ... onSubmit(prevdata) -->
    {
        schema|data: {
            ...prevdata,
            type: Form.string,
            startDate: Form.Date,
            endDate: Form.Date,
            ...
        }
    },
    ... onSubmit(prevdata) -->
    {
        data: prevdata,
        conditional: prev.repeat?
    }
]

<FormModal>
    <StructuredForm schema={formSchema} onSubmit={requestApi} />
</FormModal>

*/
