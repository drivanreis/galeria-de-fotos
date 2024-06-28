echo "Pega todos os containers"
CONTAINERS=$(docker ps -aq)

echo "Para todos os container"
if [ -n "$CONTAINERS" ]; then
    docker stop $CONTAINERS
fi

echo "Excluir todos os container"
if [ -n "$CONTAINERS" ]; then
    docker rm -f $CONTAINERS
fi

echo "Pega todas as images"
IMAGES=$(docker images -aq)

echo "Excluir todas as images"
if [ -n "$IMAGES" ]; then
    docker rmi $IMAGES
fi

# Pega as Redes
# NETWORKS=$(docker network ls -q)

# Excluir a Rede
# if [ -n "$NETWORKS" ]; then
#     docker network rm $NETWORKS
# fi

# Para o Daemon
# service docker stop

# Excluir as portas do node
# killall -9 node

# Verifique se nenhuma porta está em uso
# netstat -an | egrep ":(3001|3306|33060)"

# Excluir todos os containers parados ou em execução
# docker rm -f $(docker ps -aq)

# Remover referências ao contêiner do Cache:
docker system prune -af

# Caso as images não tenhão sido excluidas
# Ou tenha duas images com o mesmo Id, use isso:
# systemctl restart docker

# Iniciar daemon: 
# service docker start

# Criar rede:
# docker network create

# Caso as images não tenhão sido excluidas,
# Reinstale o DOCKER

# Remove volumes
# docker volume prune -af

clear
echo "Listando todos os containers e images"
docker images
docker ps -a
echo "Limpeza Concluida !!!"
echo "Iniciando o Docker Compose"
docker-compose up -d --build
