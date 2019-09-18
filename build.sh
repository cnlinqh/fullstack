#!/bin/bash
frontend(){
    cd frontend
    npm install;
    npm run build;
    docker build -t cnlinqh/fullstack.frontend .
    cd ..
}

backend(){
    cd backend
    docker build -t cnlinqh/fullstack.backend .
    cd ..
}

deploy(){
    kubectl delete -f k8s
    kubectl create -f k8s
}

#frontend
#backend
#deploy