from __future__ import annotations

from typing import Any, Dict

from .base import Connector
from .http_adapter import HTTPConnector
from .relex_connector import RelexConnector

CONNECTOR_CATALOG = {
    "relex": {
        "label": "Relex / REST ERP",
        "description": "Health-checkable REST connector for ERP endpoints.",
        "fields": ["base_url", "api_key"],
    },
    "oracle": {
        "label": "Oracle WMS",
        "description": "Generic HTTP connector for Oracle warehouse management endpoints.",
        "fields": ["base_url", "api_key"],
    },
    "sap": {
        "label": "SAP ERP",
        "description": "Generic HTTP connector for SAP-based API integrations.",
        "fields": ["base_url", "api_key"],
    },
    "generic_http": {
        "label": "HTTP Connector",
        "description": "General-purpose HTTP connector for REST services.",
        "fields": ["base_url", "headers"],
    },
}


def get_connector_catalog() -> dict[str, dict[str, Any]]:
    return CONNECTOR_CATALOG


def create_connector(connector_type: str, config: dict[str, Any]) -> Connector:
    normalized = connector_type.lower()
    if normalized == "relex":
        return RelexConnector(base_url=config["base_url"], api_key=config.get("api_key", ""))

    if normalized in {"oracle", "sap"}:
        headers = {}
        api_key = config.get("api_key")
        if api_key:
            headers["Authorization"] = f"Bearer {api_key}"
        if isinstance(config.get("headers"), dict):
            headers.update(config["headers"])
        return HTTPConnector(base_url=config["base_url"], headers=headers)

    if normalized == "generic_http":
        headers = config.get("headers") if isinstance(config.get("headers"), dict) else {}
        return HTTPConnector(base_url=config["base_url"], headers=headers)

    raise ValueError(f"Unsupported connector type: {connector_type}")
