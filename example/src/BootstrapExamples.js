import React from 'react'

export default (props) => <div {...props}>
    <section className="text-center mb-2">
        <button type="button" className="btn btn-primary">Primary</button>{' '}
        <button type="button" className="btn btn-secondary">Secondary</button>{' '}
        <button type="button" className="btn btn-success">Success</button>{' '}
        <button type="button" className="btn btn-danger">Danger</button>{' '}
        <button type="button" className="btn btn-warning">Warning</button>{' '}
        <button type="button" className="btn btn-info">Info</button>{' '}
    </section>
    <section className="text-center mb-4">
        <button type="button" className="btn btn-outline-primary">Primary</button>{' '}
        <button type="button" className="btn btn-outline-secondary">Secondary</button>{' '}
        <button type="button" className="btn btn-outline-success">Success</button>{' '}
        <button type="button" className="btn btn-outline-danger">Danger</button>{' '}
        <button type="button" className="btn btn-outline-warning">Warning</button>{' '}
        <button type="button" className="btn btn-outline-info">Info</button>{' '}
    </section>
    <section className="mb-4">
        <div className="alert alert-primary" role="alert">
        A simple primary alert—check it out!
        </div>
        <div className="alert alert-secondary" role="alert">
        A simple secondary alert—check it out!
        </div>
        <div className="alert alert-success" role="alert">
        A simple success alert—check it out!
        </div>
        <div className="alert alert-danger" role="alert">
        A simple danger alert—check it out!
        </div>
        <div className="alert alert-warning" role="alert">
        A simple warning alert—check it out!
        </div>
        <div className="alert alert-info" role="alert">
        A simple info alert—check it out!
        </div>
    </section>
</div>