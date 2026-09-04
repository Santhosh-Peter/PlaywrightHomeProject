pipeline {
    agent any

    environment {
        RANDOMTEXT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        RUN_ENVIRONMENT = 'Home'
    }

    parameters {
        string(name : 'GitUserName', description : 'Username to login to GitHub', defaultValue : 'Santhosh-Peter')
    }
    
    stages {
        stage("Get code from repo") {

            when {
                expression {
                    env.RUN_ENVIRONMENT == 'Home'
                }
            }
            steps{
                echo "Getting code from GitHub repository"
                git branch: 'forJeankins', url: 'https://github.com/Santhosh-Peter/PlaywrightHomeProject.git'
                // echo "The Git branch name is : ${BRANCH_NAME}"
                echo "The build number is : ${BUILD_NUMBER}"
                echo "The Jenkins owrkspace is :  ${WORKSPACE}"
                echo "Good Job! Keep going. Here is your random text : ${env.RANDOMTEXT}"
            }
        }
        stage ("Install node dependencies") {
            when {
                expression {
                    params.GitUserName == 'Santhosh-Peter'
                }
            }
            steps{
                echo "Installing node dependencies"
                bat 'npm ci'
            }
        }
        stage("Install Playwright deps") {
            steps{
                echo "Installing Playwright dependencies"
                bat 'npx playwright install chromium'
                echo "Playwright dependencies installed successfully"
            }
        }
        stage("Execute test") {
            steps{
                echo "Executing Playwright tests"
                bat 'npx playwright test tests/nps.spec.ts --project=chromium --workers=3'
                echo "Playwright tests execution completed"
            }
        }
        
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
        success { echo 'Playwright tests passed!' }
        failure { echo 'Playwright tests failed!' }
    }
    
    
}