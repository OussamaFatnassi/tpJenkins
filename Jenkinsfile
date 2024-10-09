pipeline {
    agent any

    stages {
        stage('cd to project directory') {
            steps {
                script {
                    sh 'cd back'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'bun install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'bun test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying application...'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'bun clean'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}