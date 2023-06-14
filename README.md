# MarkAssist-API
RESTful API implementation for MarkAssist using FastAPI

## Using the applicaiton

To use the application, follow the outlined steps:

1. Clone this repository and create a virtual environment in it:

```console
$ python3 -m venv venv
```

2. Install the modules listed in the `requirements.txt` file:

```console
(venv)$ pip3 install -r requirements.txt
```

3. You also need to start your mongodb instance. See the `.env.sample` for configurations.

4. Start the application:

```console
python main.py
```

The starter listens on port 5000 on localhost

## License

This project is licensed under the terms of MIT license.