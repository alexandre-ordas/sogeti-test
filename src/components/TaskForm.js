import React, {Component} from "react";
import { Formik, Field, ErrorMessage } from "formik";

class TaskForm extends Component {
    defaultValues = {
        title: '',
        date: new Date()
            .toISOString()
            .split('T')
            .shift(),
        description: '',
    }
    validate = values => {
        const errors = {}
        if (!values.label) {
            errors.label = 'Please enter a title.'
        }
        if (!values.date) {

            errors.date = 'Please enter a date.'

        }
        if (!values.description) {
            errors.description = 'Please enter a description.'
        }
        return errors
    }
    onSubmit = task => {
        this.props.onSubmit(task)
    }
    onCancel = event => {
        event.preventDefault()
        this.props.onCancel()
    }

    renderError(name) {
        return <ErrorMessage name={name} component="span" className="error" />
    }
    render() {
        return (
            <Formik
                initialValues={this.props.task  || this.defaultValues}
                validate={this.validate}
                onSubmit={this.onSubmit}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <form className="expense-form" onSubmit={handleSubmit}>
                        <label htmlFor="">
                            Title : <Field type="text" name="label" />
                            {this.renderError('label')}
                        </label>
                        <label htmlFor="">
                            Date : <Field type="date" name="date" />
                            {this.renderError('date')}
                        </label>
                        <label htmlFor="">
                            description: <Field type="textarea" name="description" />
                            {this.renderError('description')}
                        </label>
                        <button onClick={this.onCancel}>Cancel</button>
                        <button className="btn btn-primary" type="submit">
                            {this.props.task ? 'Edit' : 'Create'}
                        </button>
                    </form>
                )}
            </Formik>
        )
    }
}

export default TaskForm