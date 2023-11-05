import React, { useState } from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap'
import classNames from 'classnames'
import './style.scss'

import { isEmpty } from 'lodash'

const getErrorByNames = (name, errors) => {
  if (isEmpty(errors)) return

  const attrs = name.split('.')

  let newErrors = { ...errors }
  attrs.forEach((attr) => {
    newErrors = newErrors && newErrors[attr]
  })

  return newErrors
}

/* Error message */
const ErrorMessage = ({ name, errors }) => {
  return (
    <>
      {errors ? (
        <Form.Control.Feedback type="invalid" className="d-block">
          {errors['message']}
        </Form.Control.Feedback>
      ) : null}
    </>
  )
}

/* Password Input with addons */
const PasswordInput = ({
  name,
  placeholder,
  refCallback,
  errors,
  control,
  register,
  className,
  ...otherProps
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <InputGroup className="mb-0">
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          name={name}
          id={name}
          as="input"
          ref={(r) => {
            if (refCallback) refCallback(r)
          }}
          className={className}
          isInvalid={errors && errors[name] ? true : false}
          {...(register ? register(name) : {})}
          autoComplete={name}
          {...otherProps}
        />
        <div
          className={classNames('input-group-text', 'input-group-password', {
            'show-password': showPassword,
          })}
          data-password={showPassword ? 'true' : 'false'}
        >
          <span
            className="password-eye"
            onClick={() => {
              setShowPassword(!showPassword)
            }}
          ></span>
        </div>
      </InputGroup>

      <ErrorMessage name={name} errors={errors} />
    </>
  )
}

// textual form-controls—like inputs, passwords, textareas etc.
const TextualInput = ({
  type,
  name,
  placeholder,
  endIcon,
  endIconElement,
  register,
  errors,
  comp,
  rows,
  className,
  refCallback,
  ...otherProps
}) => {
  let newErrors = getErrorByNames(name, errors)

  return (
    <>
      {type === 'password' && endIcon ? (
        <>
          <PasswordInput
            name={name}
            placeholder={placeholder}
            refCallback={refCallback}
            errors={errors}
            register={register}
            className={className}
            {...otherProps}
          />
        </>
      ) : (
        <>
          <InputGroup>
            <Form.Control
              type={type}
              placeholder={placeholder}
              name={name}
              as={comp}
              id={name}
              ref={(r) => {
                if (refCallback) refCallback(r)
              }}
              className={className}
              isInvalid={newErrors ? true : false}
              {...(register ? register(name) : {})}
              rows={rows}
              {...otherProps}
            ></Form.Control>
            {type === 'text' && endIconElement && (
              <InputGroup.Text>{endIconElement}</InputGroup.Text>
            )}
          </InputGroup>

          <ErrorMessage name={name} errors={newErrors} />
        </>
      )}
    </>
  )
}

// non-textual checkbox and radio controls
const CheckInput = ({
  type,
  label,
  name,
  placeholder,
  register,
  errors,
  comp,
  rows,
  className,
  refCallback,
  ...otherProps
}) => {
  let newErrors = getErrorByNames(name, errors)

  return (
    <>
      <Form.Check
        type={type}
        label={label}
        name={name}
        id={name}
        ref={(r) => {
          if (refCallback) refCallback(r)
        }}
        className={className}
        isInvalid={newErrors ? true : false}
        {...(register ? register(name) : {})}
        {...otherProps}
      />

      <ErrorMessage name={name} errors={newErrors} />
    </>
  )
}

// handle select controls
const SelectInput = ({
  type,
  label,
  name,
  placeholder,
  register,
  errors,
  comp,
  className,
  children,
  refCallback,
  ...otherProps
}) => {
  let newErrors = getErrorByNames(name, errors)

  return (
    <>
      <Form.Select
        type={type}
        label={label}
        name={name}
        id={name}
        ref={(r) => {
          if (refCallback) refCallback(r)
        }}
        children={children}
        className={className}
        isInvalid={newErrors ? true : false}
        {...(register ? register(name) : {})}
        {...otherProps}
      />

      <ErrorMessage name={name} errors={newErrors} />
    </>
  )
}

const FormInput = ({
  label,
  type,
  name,
  placeholder,
  endIcon,
  endIconElement,
  register,
  errors,
  control,
  className,
  labelClassName,
  containerClass,
  refCallback,
  children,
  rows,
  horizontal,
  ...otherProps
}) => {
  // handle input type
  const comp =
    type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input'

  const hasEndIcon = endIcon !== undefined ? endIcon : true

  return (
    <>
      {type === 'hidden' ? (
        <input
          type={type}
          name={name}
          {...(register ? register(name) : {})}
          {...otherProps}
        />
      ) : (
        <>
          {type === 'select' ? (
            <>
              {horizontal ? (
                <Form.Group
                  as={Row}
                  className={`et-horizontal-form-group ${containerClass}`}
                >
                  {label ? (
                    <Form.Label column sm="1" className={labelClassName}>
                      {label}
                    </Form.Label>
                  ) : null}
                  <Col>
                    <SelectInput
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      refCallback={refCallback}
                      errors={errors}
                      register={register}
                      comp={comp}
                      className={className}
                      children={children}
                      {...otherProps}
                    />
                  </Col>
                </Form.Group>
              ) : (
                <Form.Group
                  className={`et-vertical-form-group ${containerClass}`}
                >
                  {label ? (
                    <Form.Label className={labelClassName}>{label}</Form.Label>
                  ) : null}

                  <SelectInput
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    refCallback={refCallback}
                    errors={errors}
                    register={register}
                    comp={comp}
                    className={className}
                    children={children}
                    {...otherProps}
                  />
                </Form.Group>
              )}
            </>
          ) : (
            <>
              {type === 'checkbox' || type === 'radio' ? (
                <Form.Group className={`${containerClass}`}>
                  <CheckInput
                    type={type}
                    label={label}
                    name={name}
                    placeholder={placeholder}
                    refCallback={refCallback}
                    errors={errors}
                    register={register}
                    comp={comp}
                    className={className}
                    rows={rows}
                    {...otherProps}
                  />
                </Form.Group>
              ) : (
                <>
                  {horizontal ? (
                    <Form.Group
                      as={Row}
                      className={`et-horizontal-form-group ${containerClass}`}
                    >
                      {label ? (
                        <Form.Label column sm="1" className={labelClassName}>
                          {label}
                        </Form.Label>
                      ) : null}
                      <Col>
                        <TextualInput
                          type={type}
                          name={name}
                          placeholder={placeholder}
                          endIcon={hasEndIcon}
                          endIconElement={endIconElement}
                          refCallback={refCallback}
                          errors={errors}
                          register={register}
                          comp={comp}
                          className={className}
                          rows={rows}
                          {...otherProps}
                        />
                      </Col>
                    </Form.Group>
                  ) : (
                    <Form.Group
                      className={`et-vertical-form-group ${containerClass}`}
                    >
                      {label ? (
                        <Form.Label className={labelClassName}>
                          {label}
                        </Form.Label>
                      ) : null}

                      <TextualInput
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        endIcon={hasEndIcon}
                        endIconElement={endIconElement}
                        refCallback={refCallback}
                        errors={errors}
                        register={register}
                        comp={comp}
                        className={className}
                        rows={rows}
                        {...otherProps}
                      />
                    </Form.Group>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default FormInput
