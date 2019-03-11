FROM elixir

RUN mix local.hex --force \
&& mix archive.install hex phx_new 1.4.1 --force \
&& mkdir server 

COPY server/ server/ 
WORKDIR /server
RUN mix deps.get \
&& mix local.rebar --force

EXPOSE 4000

CMD ["mix", "phx.server"] 
