FROM python:3.10

WORKDIR /app

RUN apt-get update && apt-get install -y nmap

COPY requirements.txt .

RUN pip3 install -r requirements.txt

RUN pip3 install playwright


RUN playwright install

RUN playwright install-deps

EXPOSE 8000

CMD [ "python3", "manage.py","runserver" ,"0.0.0.0:8000"]