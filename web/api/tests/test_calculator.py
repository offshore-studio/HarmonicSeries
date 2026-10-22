"""Regression tests for GPU/cluster scaling math."""

from calculator import TARGET_N_SUM_40, compute_scaling, format_duration


def test_compute_scaling_basic():
    result = compute_scaling(1e9, gpu_count=1, hourly_rate=0.35)
    assert result["valid"] is True
    assert result["target_n_sum_40"] == TARGET_N_SUM_40
    assert result["terms_per_sec"] == 1e9
    assert result["gpu_count"] == 1
    assert result["cluster_terms_per_sec"] == 1e9
    expected_sec = TARGET_N_SUM_40 / 1e9
    assert abs(result["time"]["seconds"] - expected_sec) < 1e-6
    assert result["estimated_cost_usd"] > 0


def test_compute_scaling_multi_gpu_linear():
    one = compute_scaling(3.685e9, gpu_count=1, hourly_rate=0.2)
    eight = compute_scaling(3.685e9, gpu_count=8, hourly_rate=0.2)
    assert one["valid"] and eight["valid"]
    assert abs(eight["cluster_terms_per_sec"] / one["cluster_terms_per_sec"] - 8.0) < 1e-9
    assert abs(eight["time"]["seconds"] * 8 - one["time"]["seconds"]) < 1.0


def test_compute_scaling_rejects_non_positive():
    result = compute_scaling(0.0, gpu_count=1)
    assert result["valid"] is False
    assert "error" in result


def test_format_duration_years():
    d = format_duration(31557600.0 * 2.5)
    assert d["years"] == 2.5
    assert "yr" in d["human"]
