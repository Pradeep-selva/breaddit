FROM golang

RUN mkdir /breaddit

ADD . /breaddit

WORKDIR /breaddit

RUN go build -o main .

CMD ["/breaddit/main"]
