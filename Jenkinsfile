pipeline {
agent any

```
tools {
    nodejs 'NodeJS 24.18.0'
    maven 'Maven-3.9'
    jdk 'JDK-21'
    allure 'Allure'
}

parameters {
    choice(
        name: 'ENVIRONMENT',
        choices: ['QA', 'dev', 'stage', 'Prod'],
        description: 'Select environment to run tests'
    )

    choice(
        name: 'BROWSER',
        choices: ['chromium', 'firefox', 'webkit'],
        description: 'Select browser'
    )

    choice(
        name: 'TEST_SUITE',
        choices: ['all', 'smoke', 'regression', 'api-smoke'],
        description: 'Select test suite'
    )
}

options {
    timeout(time: 30, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20'))
    disableConcurrentBuilds()
}

stages {

    // =====================================================
    // STAGE 1: BUILD APP + UNIT TESTS
    // =====================================================

    stage('Build & Unit Tests') {
        steps {
            echo "========================================="
            echo "  Building App + Running Unit Tests"
            echo "========================================="

            dir('dev-app') {
                git url: 'https://github.com/jglick/simple-maven-project-with-tests.git',
                    branch: 'master'

                sh 'mvn clean install -Dmaven.test.failure.ignore=true'
            }
        }

        post {
            always {
                junit 'dev-app/target/surefire-reports/*.xml'
            }
        }
    }

    // =====================================================
    // STAGE 2: DEPLOY DEV
    // =====================================================

    stage('Deploy to DEV') {
        steps {
            echo "Deploying to DEV..."
        }
    }

    // =====================================================
    // STAGE 3: DEV SANITY
    // =====================================================

    stage('DEV - Sanity Tests') {
        steps {
            echo "========================================="
            echo "  Running SANITY @smoke on DEV"
            echo "========================================="

            sh 'mkdir -p reports-dev/html allure-results-dev'

            withCredentials([
                usernamePassword(
                    credentialsId: 'dev-credentials',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                ),
                string(
                    credentialsId: 'dev-base-url',
                    variable: 'BASE_URL'
                )
            ]) {

                sh '''
                    npm ci

                    npx playwright test \
                        --project=chromium \
                        --grep @smoke
                '''
            }
        }

        post {
            always {
                sh '''
                    npx allure generate allure-results-dev \
                        --clean \
                        -o reports-dev/allure || true
                '''

                publishHTML(target: [
                    reportName: 'DEV Sanity - PW HTML Report',
                    reportDir: 'reports-dev/html',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])

                publishHTML(target: [
                    reportName: 'DEV Sanity - Allure Report',
                    reportDir: 'reports-dev/allure',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])
            }
        }
    }

    // =====================================================
    // STAGE 4: DEPLOY QA
    // =====================================================

    stage('Deploy to QA') {
        steps {
            echo "Deploying to QA..."
        }
    }

    // =====================================================
    // STAGE 5: QA REGRESSION
    // =====================================================

    stage('QA - Regression Tests') {
        steps {
            echo "========================================="
            echo "  Running REGRESSION on QA"
            echo "========================================="

            sh 'mkdir -p reports-qa/html allure-results-qa'

            withCredentials([
                usernamePassword(
                    credentialsId: 'qa-credentials',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                ),
                string(
                    credentialsId: 'qa-base-url',
                    variable: 'BASE_URL'
                )
            ]) {

                sh '''
                    npm ci

                    npx playwright test \
                        --project=chromium
                '''
            }
        }

        post {
            always {
                sh '''
                    npx allure generate allure-results-qa \
                        --clean \
                        -o reports-qa/allure || true
                '''

                publishHTML(target: [
                    reportName: 'QA Regression - PW HTML Report',
                    reportDir: 'reports-qa/html',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])

                publishHTML(target: [
                    reportName: 'QA Regression - Allure Report',
                    reportDir: 'reports-qa/allure',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])
            }
        }
    }

    // =====================================================
    // STAGE 6: DEPLOY STAGE
    // =====================================================

    stage('Deploy to STAGE') {
        steps {
            echo "Deploying to STAGE..."
        }
    }

    // =====================================================
    // STAGE 7: STAGE SANITY
    // =====================================================

    stage('STAGE - Sanity Tests') {
        steps {
            echo "========================================="
            echo "  Running SANITY @smoke on STAGE"
            echo "========================================="

            sh 'mkdir -p reports-stage/html allure-results-stage'

            withCredentials([
                usernamePassword(
                    credentialsId: 'stage-credentials',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                ),
                string(
                    credentialsId: 'stage-base-url',
                    variable: 'BASE_URL'
                )
            ]) {

                sh '''
                    npm ci

                    npx playwright test \
                        --project=chromium \
                        --grep @smoke
                '''
            }
        }

        post {
            always {
                sh '''
                    npx allure generate allure-results-stage \
                        --clean \
                        -o reports-stage/allure || true
                '''

                publishHTML(target: [
                    reportName: 'STAGE Sanity - PW HTML Report',
                    reportDir: 'reports-stage/html',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])

                publishHTML(target: [
                    reportName: 'STAGE Sanity - Allure Report',
                    reportDir: 'reports-stage/allure',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])
            }
        }
    }

    // =====================================================
    // STAGE 8: PROD APPROVAL
    // =====================================================

    stage('Approval for PROD') {
        steps {
            input message: 'Deploy to PROD?',
                ok: 'Yes, Deploy!',
                submitter: 'admin'
        }
    }

    // =====================================================
    // STAGE 9: DEPLOY PROD
    // =====================================================

    stage('Deploy to PROD') {
        steps {
            echo "Deploying to PROD..."
        }
    }

    // =====================================================
    // STAGE 10: PROD SMOKE
    // =====================================================

    stage('PROD - Smoke Tests') {
        steps {
            echo "========================================="
            echo "  Running SMOKE @smoke on PROD"
            echo "========================================="

            sh 'mkdir -p reports-prod/html allure-results-prod'

            withCredentials([
                usernamePassword(
                    credentialsId: 'prod-credentials',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                ),
                string(
                    credentialsId: 'prod-base-url',
                    variable: 'BASE_URL'
                )
            ]) {

                sh '''
                    npm ci

                    npx playwright test \
                        --project=chromium \
                        --grep @smoke
                '''
            }
        }

        post {
            always {
                sh '''
                    npx allure generate allure-results-prod \
                        --clean \
                        -o reports-prod/allure || true
                '''

                publishHTML(target: [
                    reportName: 'PROD Smoke - PW HTML Report',
                    reportDir: 'reports-prod/html',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])

                publishHTML(target: [
                    reportName: 'PROD Smoke - Allure Report',
                    reportDir: 'reports-prod/allure',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])
            }
        }
    }
}

// =====================================================
// POST ACTIONS
// NO SLACK
// NO EMAIL
// NO DOCKER
// =====================================================

post {

    success {
        echo '==========================================='
        echo '  PIPELINE: SUCCESS'
        echo '==========================================='
        echo "Build Number: ${env.BUILD_NUMBER}"
        echo "Environment: ${params.ENVIRONMENT}"
    }

    failure {
        echo '==========================================='
        echo '  PIPELINE: FAILED'
        echo '==========================================='
        echo "Build Number: ${env.BUILD_NUMBER}"
        echo "Environment: ${params.ENVIRONMENT}"
    }

    always {
        echo "Jenkins pipeline execution completed."
    }
}
```

}
