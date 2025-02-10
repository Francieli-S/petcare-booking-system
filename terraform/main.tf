terraform {
  required_version = ">= 0.13"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}
provider "aws" {
  region = var.aws_region
}
##############################
# VPC, Subnets, IGW, NAT Gateways, and Route Tables
##############################
# Create VPC
resource "aws_vpc" "petcare_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "petcare-vpc"
  }
}
# Internet Gateway
resource "aws_internet_gateway" "petcare_igw" {
  vpc_id = aws_vpc.petcare_vpc.id
  tags = {
    Name = "petcare-igw"
  }
}
# Public Subnets
resource "aws_subnet" "petcare_public_subnet_1" {
  vpc_id                  = aws_vpc.petcare_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true
  tags = {
    Name = "petcare-public-1"
  }
}
resource "aws_subnet" "petcare_public_subnet_2" {
  vpc_id                  = aws_vpc.petcare_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true
  tags = {
    Name = "petcare-public-2"
  }
}
# Private Subnets
resource "aws_subnet" "petcare_private_subnet_1" {
  vpc_id            = aws_vpc.petcare_vpc.id
  cidr_block        = "10.0.101.0/24"
  availability_zone = "${var.aws_region}a"
  tags = {
    Name = "petcare-private-1"
  }
}
resource "aws_subnet" "petcare_private_subnet_2" {
  vpc_id            = aws_vpc.petcare_vpc.id
  cidr_block        = "10.0.102.0/24"
  availability_zone = "${var.aws_region}b"
  tags = {
    Name = "petcare-private-2"
  }
}
# Public Route Table and Associations
resource "aws_route_table" "petcare_public_rt" {
  vpc_id = aws_vpc.petcare_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.petcare_igw.id
  }
  tags = {
    Name = "petcare-public-rt"
  }
}
resource "aws_route_table_association" "petcare_public_rt_assoc_1" {
  subnet_id      = aws_subnet.petcare_public_subnet_1.id
  route_table_id = aws_route_table.petcare_public_rt.id
}
resource "aws_route_table_association" "petcare_public_rt_assoc_2" {
  subnet_id      = aws_subnet.petcare_public_subnet_2.id
  route_table_id = aws_route_table.petcare_public_rt.id
}
# NAT Gateways for Private Subnets
# NAT Gateway in Public Subnet 1
resource "aws_eip" "petcare_nat_eip_1" {
  vpc = true
  depends_on = [aws_internet_gateway.petcare_igw]
}
resource "aws_nat_gateway" "petcare_nat_gw_1" {
  allocation_id = aws_eip.petcare_nat_eip_1.id
  subnet_id     = aws_subnet.petcare_public_subnet_1.id
  tags = {
    Name = "petcare-nat-gw-1"
  }
}
# Private Route Table and Associations (using NAT Gateway)
resource "aws_route_table" "petcare_private_rt" {
  vpc_id = aws_vpc.petcare_vpc.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.petcare_nat_gw_1.id
  }
  tags = {
    Name = "petcare-private-rt"
  }
}
resource "aws_route_table_association" "petcare_private_rt_assoc_1" {
  subnet_id      = aws_subnet.petcare_private_subnet_1.id
  route_table_id = aws_route_table.petcare_private_rt.id
}
resource "aws_route_table_association" "petcare_private_rt_assoc_2" {
  subnet_id      = aws_subnet.petcare_private_subnet_2.id
  route_table_id = aws_route_table.petcare_private_rt.id
}
##############################
# Security Groups and ALB
##############################
# Security Group for ALB
resource "aws_security_group" "petcare_alb_sg" {
  name        = "petcare-alb-sg"
  description = "Security Group for the ALB"
  vpc_id      = aws_vpc.petcare_vpc.id
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "petcare-alb-sg"
  }
}
# Security Group for ECS Tasks
resource "aws_security_group" "petcare_ecs_sg" {
  name        = "petcare-ecs-sg"
  description = "Security Group for ECS tasks"
  vpc_id      = aws_vpc.petcare_vpc.id
  ingress {
    from_port       = 5002
    to_port         = 5002
    protocol        = "tcp"
    security_groups = [aws_security_group.petcare_alb_sg.id]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "petcare-ecs-sg"
  }
}
# Application Load Balancer
resource "aws_lb" "petcare_alb" {
  name               = "petcare-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.petcare_alb_sg.id]
  subnets            = [
    aws_subnet.petcare_public_subnet_1.id,
    aws_subnet.petcare_public_subnet_2.id
  ]
  tags = {
    Name = "petcare-alb"
  }
}
# Target Group with target_type "ip" and lifecycle for create_before_destroy
resource "aws_lb_target_group" "petcare_tg" {
  name        = "petcare-tg"
  port        = 5002
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.petcare_vpc.id
  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
    path                = "/"
    protocol            = "HTTP"
  }
  lifecycle {
    create_before_destroy = true
  }
  tags = {
    Name = "petcare-tg"
  }
}
# ALB Listener
resource "aws_lb_listener" "petcare_listener" {
  load_balancer_arn = aws_lb.petcare_alb.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.petcare_tg.arn
  }
}
##############################
# ECS Cluster, IAM, ECR, Log Group, Task Definition, and Service
##############################
# ECS Cluster
resource "aws_ecs_cluster" "petcare_cluster" {
  name = "petcare-cluster"
}
# CloudWatch Log Group for ECS containers
resource "aws_cloudwatch_log_group" "ecs_log_group" {
  name              = "/ecs/petcare"
  retention_in_days = 7
}
# IAM Role for ECS Task Execution
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "petcare-ecs-task-execution-role"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = { Service = "ecs-tasks.amazonaws.com" },
      Action    = "sts:AssumeRole"
    }]
  })
}
resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
# ECR Repository for Application Image
resource "aws_ecr_repository" "petcare_repo" {
  name                 = "petcare"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
  image_scanning_configuration {
    scan_on_push = true
  }
  tags = {
    Name = "petcare-repo"
  }
}
# ECS Task Definition with Two Containers and Container Dependencies
resource "aws_ecs_task_definition" "petcare_task" {
  family                   = "petcare-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
container_definitions = jsonencode([
  {
    "name": "petcare-db",
    "image": "postgres:15",
    "essential": true,
    "portMappings": [
      {
        "containerPort": 5432,
        "hostPort": 5432,
        "protocol": "tcp"
      }
    ],
    "environment": [
      { "name": "POSTGRES_HOST", "value": "localhost" },
      { "name": "POSTGRES_PORT", "value": "5432" },
      { "name": "POSTGRES_USER", "value": "petcare_admin" },
      { "name": "POSTGRES_PASSWORD", "value": "petcare_admin" },
      { "name": "POSTGRES_DB", "value": "petcare_db" }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": aws_cloudwatch_log_group.ecs_log_group.name,
        "awslogs-region": var.aws_region,
        "awslogs-stream-prefix": "db"
      }
    },
    "healthCheck": {
      "command": ["CMD-SHELL", "pg_isready -U petcare_admin"],
      "interval": 30,
      "timeout": 5,
      "retries": 3,
      "startPeriod": 30
    }
  },
  {
    "name": "petcare-app",
    "image": "${aws_ecr_repository.petcare_repo.repository_url}:latest",
    "essential": true,
    "portMappings": [
      {
        "containerPort": 5002,
        "hostPort": 5002,
        "protocol": "tcp"
      }
    ],
    "environment": [
      { "name": "POSTGRES_HOST", "value": "localhost" },
      { "name": "PORT", "value": "5002" },
      { "name": "NODE_ENV", "value": "production" },
      { "name": "JWT_SECRET", "value": "$2y$12$hYrxrRlOFt3lGAPg2v5LnOupdSlDKict7Wy.1awUB6KVKQfbt4fjG" }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": aws_cloudwatch_log_group.ecs_log_group.name,
        "awslogs-region": var.aws_region,
        "awslogs-stream-prefix": "ecs"
      }
    },
    "dependsOn": [
      {
        "containerName": "petcare-db",
        "condition": "START"
      }
    ]
  }
])
}
# ECS Service
resource "aws_ecs_service" "petcare_service" {
  name            = "petcare-service"
  cluster         = aws_ecs_cluster.petcare_cluster.id
  task_definition = aws_ecs_task_definition.petcare_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    subnets         = [
      aws_subnet.petcare_private_subnet_1.id,
      aws_subnet.petcare_private_subnet_2.id
    ]
    security_groups = [aws_security_group.petcare_ecs_sg.id]
    assign_public_ip = false
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.petcare_tg.arn
    container_name   = "petcare-app"
    container_port   = 5002
  }
  depends_on = [
    aws_lb_listener.petcare_listener
  ]
}