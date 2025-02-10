output "alb_dns_name" {
  description = "DNS do ALB para acessar a aplicação"
  value       = aws_lb.petcare_alb.dns_name
}
output "ecs_cluster_name" {
  description = "Nome do cluster ECS"
  value       = aws_ecs_cluster.petcare_cluster.name
}
output "ecr_repository_url" {
  description = "URL do repositório ECR para a aplicação petcare"
  value       = aws_ecr_repository.petcare_repo.repository_url
}