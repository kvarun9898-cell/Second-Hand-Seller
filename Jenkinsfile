pipeline {
    agent {
        label 'ec2-agent-2'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/kvarun9898-cell/Second-Hand-Seller.git'
            }
        }

        stage('Test SSH Connection') {
            steps {
                sh '''
                    ssh -i /var/lib/jenkins/.ssh/id_ed25519 \
                        -o StrictHostKeyChecking=no \
                        -o IdentitiesOnly=yes \
                        ubuntu@10.0.1.237 \
                        "echo SSH connection successful"
                '''
            }
        }

        stage('Deploy to Docker Server') {
            steps {
                sh '''
                    ssh -i /var/lib/jenkins/.ssh/id_ed25519 \
                        -o StrictHostKeyChecking=no \
                        -o IdentitiesOnly=yes \
                        ubuntu@10.0.1.237 "
                            cd ~/Second-Hand-Seller &&
                            git pull origin main &&
                            docker compose down &&
                            docker compose build &&
                            docker compose up -d
                        "
                '''
            }
        }

        stage('Check Containers') {
            steps {
                sh '''
                    ssh -i /var/lib/jenkins/.ssh/id_ed25519 \
                        -o StrictHostKeyChecking=no \
                        -o IdentitiesOnly=yes \
                        ubuntu@10.0.1.237 \
                        "cd ~/Second-Hand-Seller && docker compose ps"
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
