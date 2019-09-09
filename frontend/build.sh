fbuild(){
    npm install;
    npm run build;
    docker build -t cnlinqh/fullstack.frontend .
}