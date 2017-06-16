FROM <%= centos %>

# RUN mkdir -p /root/.ssh
# COPY id_rsa /root/.ssh/
# RUN chmod 600 /root/.ssh/id_rsa
# RUN echo -e "Host *\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config

RUN rm -rf /etc/yum.repos.d/*
COPY CentOS-Base.repo /etc/yum.repos.d/
RUN rpm --import /etc/pki/rpm-gpg/RPM* \
  && yum install -y git make gcc-c++ \
  && yum clean all

# install node8.1.0
RUN curl -SLO "http://mirrors.ustc.edu.cn/node/v8.1.0/node-v8.1.0-linux-x64.tar.gz" && \
  tar -zxf node-v8.1.0-linux-x64.tar.gz -C /usr/local/ --strip-components=1 && \
  rm -rf ~/.node-gyp && \
  mkdir ~/.node-gyp && \
  tar -zxf node-v8.1.0-linux-x64.tar.gz -C ~/.node-gyp && \
  mv ~/.node-gyp/node-v8.1.0-linux-x64 ~/.node-gyp/8.1.0 && \
  printf "9\n">~/.node-gyp/8.1.0/installVersion && \
  rm -rf node-v8.1.0-linux-x64.tar.gz

RUN mkdir -p /data/<%= projectName %>/dist
WORKDIR /data/<%= projectName %>

COPY package.json .
COPY package-lock.json .

RUN npm config set registry http://registry.npm.taobao.org \
  && npm config set loglevel http \
  && npm install

COPY conf/ ./conf/
COPY src/ ./src/
COPY webpack.config.js .babelrc ./

VOLUME /data/<%= projectName %>/dist
EXPOSE 9000

# ENTRYPOINT ["npm", "run"]
CMD ["npm", "run", "prod"]


