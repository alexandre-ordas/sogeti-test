import React, {Component} from "react";
import { Formik, Field, ErrorMessage } from "formik";

class TaskForm extends Component {
    defaultValues = {
        label: '',
        description: '',
    }
    validate = values => {
        const errors = {}
        if (!values.label) {
            errors.label = 'Please enter a title.'
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
        return <ErrorMessage name={name} component="span" className="text-danger" />
    }
    render() {
        return (
            <Formik
                initialValues={this.props.task  || this.defaultValues}
                validate={this.validate}
                onSubmit={this.onSubmit}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <form className="d-flex flex-column p-3 " onSubmit={handleSubmit}>
                        <label htmlFor="">
                            Title : <Field type="text" name="label" className={"form-control my-3"} />
                            {this.renderError('label')}
                        </label>
                        <label htmlFor="">
                            Description:
                                <Field component="textarea" name="description" className={"form-control my-3"}/>
                            {this.renderError('description')}
                        </label>
                        <div>
                            <button
                                className={"btn btn-secondary btn-lg me-3"}
                                onClick={this.onCancel}>Cancel
                            </button>
                            <button className="btn btn-primary btn-lg" type="submit">
                                {this.props.task ? 'Edit' : 'Create'}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        )
    }
}

export default TaskForm