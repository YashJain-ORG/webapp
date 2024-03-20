logging:
  receivers:
    my-app-receiver:
      type: files
      include_paths:
        - /var/log/webapplog/myapp.log
        - /var/log/syslog
      record_log_file_path: true
  processors:
    my-app-processor:
      type: parse_json
      time_key: time
      time_format: "%Y-%m-%dT%H:%M:%S.%L%Z"
  service:
    pipelines:
      default_pipeline:
        receivers: [my-app-receiver]
        processors: [my-app-processor]
metrics:
  receivers:
    hostmetrics:
      type: hostmetrics
      collection_interval: 60s  
  processors:
  metrics_filter:
    type: exclude_metrics
    metrics_pattern:[]     
  service:
    pipelines:
      default_pipeline:
        receivers: [hostmetrics]
        processors: [metrics_filter]       
