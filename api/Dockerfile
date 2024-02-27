# Base Dockerfile - https://github.com/docker-library/python/blob/a1aa406bfd8c7b129e6e0ee0ba972b863624ac0d/3.6/stretch/Dockerfile
FROM python:3.6.4-stretch

ENV PYTHONUNBUFFERED 1
ENV DEBIAN_FRONTEND noninteractive

# Create the source code directory.
ARG SOURCE_DIR=/usr/src/app/
RUN mkdir -p ${SOURCE_DIR}
WORKDIR ${SOURCE_DIR}



# Install Python packages via pip.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Add the source code. If sharing code via volume, the code added at image build time is not used.
COPY . .

# Use Django's manage.py script to serve the application over port 8080.
CMD [ "python", "./manage.py", "runserver", "0.0.0.0:8080" ]
EXPOSE 8080