# MarkAssist-API
RESTful API implementation for MarkAssist using FastAPI

## Using the applicaiton

To use the application, follow the outlined steps:

1. Clone this repository and create a virtual environment in it:
```console
git clone https://github.com/DinithKumudika/MarkAssist-API.git
```
```console
$ python -m venv venv
```

2. Install the modules listed in the `requirements.txt` file:

```console
(venv)$ pip install -r requirements.txt
```

3. You also need to start your mongodb instance. See the `.env.sample` for configurations.

4. goto src directory.

```console
cd src
```

5. Start the application:

```console
python main.py
```

The starter listens on port 8000 on localhost

## Project structure

main.py - FastAPI application instance, CORS configuration and api router

api.py - handlers for routes

config - app configuration and database connection

models - database quering methods

routes - api endpoints

schemas - defined schemas for validate requests and responses

utils - utility functions and classes

## License

This project is licensed under the terms of MIT license.