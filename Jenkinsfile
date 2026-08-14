pipeline {
    agent {
        label 'ec2-agent-2'
    }

    stages {

        stage('Git Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Files') {
            steps {
                sh '''
                    pwd
                    ls -la
                '''
            }
        }

        stage('Build Docker') {
            steps {
                sh '''
                    docker compose build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose down || true
                    docker compose up -d
                '''
            }
        }

        stage('Check Containers') {
            steps {
                sh '''
                    docker compose ps
                '''
            }
        }

        stage('Test Backend') {
            steps {
                sh '''
                    sleep 10
                    curl -f http://localhost:5000
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }

        failure {
            echo 'Deployment failed!'
        }
    }
}
